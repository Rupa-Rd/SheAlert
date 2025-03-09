import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Result = ({ route }) => {
  const { transcription, emotions } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transcription:</Text>
      <Text style={styles.text}>{transcription}</Text>

      <Text style={styles.title}>Emotions:</Text>
      {Object.entries(emotions).map(([emotion, score]) => (
        <Text key={emotion} style={styles.text}>
          {`${emotion}: ${(score * 100).toFixed(2)}%`}
        </Text>
      ))}
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
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default Result;