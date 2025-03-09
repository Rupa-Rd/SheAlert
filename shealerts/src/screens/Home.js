import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Home = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation(); // Initialize navigation

  // Start recording automatically when the component mounts
  useEffect(() => {
    startRecording();
  }, []);

  // Function to start recording
  async function startRecording() {
    try {
      // Request microphone permissions
      const permissionResponse = await Audio.requestPermissionsAsync();

      if (permissionResponse.status !== 'granted') {
        Alert.alert('Permission not granted', 'Microphone access is required to record audio.');
        return;
      }

      // Configure audio mode for recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Start recording
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

  // Function to stop recording and navigate to the results page
  async function stopRecording() {
    if (!recording) return;

    try {
      setIsLoading(true);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      if (!uri) {
        throw new Error('Failed to get URI for recording');
      }

      // Prepare the audio file for upload
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'audio/m4a',
        name: 'audio.m4a',
      });

      // Send the audio file to the backend API
      const response = await fetch('https://shealert.onrender.com/transcribe-and-detect-emotions', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const data = await response.json();

      // Navigate to the results page with the API response
      navigation.navigate('Result', { transcription: data.transcription, emotions: data.emotions });
    } catch (error) {
      console.error('Failed to process audio:', error);
      Alert.alert('Processing Error', 'Failed to process audio. Please try again.');
    } finally {
      setIsRecording(false);
      setRecording(null);
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Real-Time Audio Transcription & Emotion Detection</Text>

      {/* Recording indicator */}
      {isRecording && (
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
      )}

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

// Styles
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
});

export default Home;