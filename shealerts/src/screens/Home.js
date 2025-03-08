import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Audio } from 'expo-av';

const Home = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null); // State to hold the recording object
  const [transcription, setTranscription] = useState('');
  const [emotions, setEmotions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
      setRecording(newRecording); // Save the recording object
      setIsRecording(true); // Update recording state
    } catch (err) {
      console.error('Failed to start recording:', err);
      Alert.alert('Recording Error', 'Failed to start recording. Please try again.');
    }
  }

  // Function to stop recording
  async function stopRecording() {
    if (!recording) return;

    try {
      setIsLoading(true); // Show loading indicator
      await recording.stopAndUnloadAsync(); // Stop and unload the recording
      const uri = recording.getURI(); // Get the URI of the recording

      if (!uri) {
        throw new Error('Failed to get URI for recording');
      }

      // Prepare the audio file for upload
      const formData = new FormData();
      formData.append('audio', {
        uri,
        type: 'audio/m4a', // MIME type for the audio file
        name: 'audio.m4a', // File name
      });

      // Send the audio file to the backend API
      const response = await fetch('http://192.168.1.100:3000/transcribe-and-detect-emotions', {
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

      // Update state with the response
      setTranscription(data.transcription);
      setEmotions(data.emotions);
    } catch (error) {
      console.error('Failed to process audio:', error);
      Alert.alert('Processing Error', 'Failed to process audio. Please try again.');
    } finally {
      setIsRecording(false); // Reset recording state
      setRecording(null); // Clear the recording object
      setIsLoading(false); // Hide loading indicator
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Real-Time Audio Transcription & Emotion Detection</Text>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {transcription && (
        <View style={styles.resultContainer}>
          <Text style={styles.subtitle}>Transcription:</Text>
          <Text>{transcription}</Text>
          <Text style={styles.subtitle}>Emotions:</Text>
          {Object.entries(emotions).map(([emotion, score]) => (
            <Text key={emotion}>{`${emotion}: ${(score * 100).toFixed(2)}%`}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
});

export default Home;