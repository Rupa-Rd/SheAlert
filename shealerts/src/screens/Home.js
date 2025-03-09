import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  // Request permission for audio recording
  useEffect(() => {
    const requestPermission = async () => {
      const permissionResponse = await Audio.requestPermissionsAsync();
      if (permissionResponse.status !== 'granted') {
        Alert.alert('Permission not granted', 'Microphone access is required to record audio.');
      }
    };
    requestPermission();
  }, []);

  // Start audio recording
  async function startRecording() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording:', err);
      Alert.alert('Recording Error', 'Failed to start recording. Please try again.');
    }
  }

  // Stop audio recording and send it for transcription and emotion detection
  async function stopRecording() {
    if (!recording) return;

    try {
      setIsLoading(true);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      if (!uri) {
        throw new Error('Failed to get URI for recording');
      }

      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'audio/m4a',
        name: 'audio.m4a',
      });

      const response = await fetch('https://shealert.onrender.com/transcribe-and-detect-emotions', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      let data = { transcription: '', emotions: { joy: 1 } };

      if (response.ok) {
        data = await response.json();
      }

      // Navigate to Result screen with transcription and emotions data
      navigation.navigate('Result', { transcription: data.transcription, emotions: data.emotions });
    } catch (error) {
      console.error('Failed to process audio:', error);
      navigation.navigate('Result', { transcription: '', emotions: { joy: 1 } });
    } finally {
      setIsRecording(false);
      setRecording(null);
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Real-Time Audio Transcription & Emotion Detection</Text>

      {isRecording ? (
        <View style={styles.recordingIndicator}>
          <Text style={styles.recordingText}>Recording...</Text>
          <FontAwesome
            name="stop"
            size={40}
            color="white"
            style={styles.stopButton}
            onPress={stopRecording}
          />
        </View>
      ) : (
        <FontAwesome
          name="microphone"
          size={40}
          color="white"
          style={styles.recordButton}
          onPress={startRecording}
        />
      )}

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  recordingIndicator: {
    alignItems: 'center',
    marginTop: 20,
  },
  recordingText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  stopButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
  },
  recordButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 50,
  },
});

export default Home;
