import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

const Guidance = ({ route }) => {
  const { transcription } = route.params;
  const [guidance, setGuidance] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateGuidance = async () => {
    setIsLoading(true);
    try {
      if (!transcription || transcription.trim() === '') {
        setGuidance('Stay happy and healthy today');
        return;
      }

      const response = await fetch('http://localhost:3000/generate-guidance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript: transcription }),
      });

      const data = await response.json();
      setGuidance(data.guidance);
    } catch (error) {
      console.error('Error generating guidance:', error);
      setGuidance('Failed to generate guidance. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Transcript:</Text>
      <Text style={styles.transcript}>
        {transcription || 'No transcript available'}
      </Text>

      <Button title="Generate Guidance" onPress={generateGuidance} disabled={isLoading} />

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

      {guidance && (
        <>
          <Text style={styles.title}>Generated Guidance:</Text>
          <Text style={styles.guidance}>{guidance}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  transcript: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 20,
  },
  guidance: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default Guidance;