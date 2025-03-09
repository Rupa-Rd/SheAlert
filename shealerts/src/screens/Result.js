import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as SMS from 'expo-sms';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import BannerWithProfileIcon from '../components/BannerWithProfileIcon';

const Result = ({ route }) => {
  const { transcription, emotions } = route.params;
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [guidance, setGuidance] = useState('');
  const navigation = useNavigation();

  // Fetch user's location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location access is required to send SMS.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // Function to handle guidance
  const handleGuidance = async () => {
    setIsLoading(true);
    try {
      if (!transcription || transcription.trim() === '') {
        setGuidance('Stay happy and healthy today');
        return;
      }

      const response = await fetch('https://shealert.onrender.com/generate-guidance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript: transcription }),
      });

      const data = await response.json();
      if (data && data.guidance) {
        setGuidance(data.guidance);
        navigation.navigate('Guidance', { guidance: data.guidance });
      } else {
        setGuidance('Failed to generate guidance. Please try again.');
      }
    } catch (error) {
      console.error('Error generating guidance:', error);
      setGuidance('Failed to generate guidance. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to send SMS
  const sendSMS = async () => {
    if (!location) {
      Alert.alert('Error', 'Location not available.');
      return;
    }

    const { latitude, longitude } = location.coords;
    const message = `I need help! My current location is: https://www.google.com/maps?q=${latitude},${longitude}`;

    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      // Replace with actual emergency contact numbers
      const emergencyContacts = ['8667012995', '0987654321'];
      const { result } = await SMS.sendSMSAsync(emergencyContacts, message);

      if (result === 'sent') {
        Alert.alert('SMS Sent', 'Your location has been shared with the emergency contacts.');
      } else {
        Alert.alert('SMS Not Sent', 'The SMS was not sent. Please try again.');
      }
    } else {
      Alert.alert('SMS Not Available', 'SMS services are not available on this device.');
    }
  };

  return (
    <>
      <BannerWithProfileIcon />
      <View style={styles.container}>
        <Text style={styles.title}>Transcription:</Text>
        <Text style={styles.text}>{transcription || 'No transcription available'}</Text>

        <Text style={styles.title}>Emotions:</Text>
        {Object.entries(emotions).map(([emotion, score]) => (
          <Text key={emotion} style={styles.text}>
            {`${emotion}: ${(score * 100).toFixed(2)}%`}
          </Text>
        ))}

        <TouchableOpacity style={styles.redButton} onPress={sendSMS}>
          <Text style={styles.buttonText}>Send SMS to Emergency Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.guidanceButton} onPress={handleGuidance} disabled={isLoading}>
          <Text style={styles.buttonText}>Need Guidance?</Text>
        </TouchableOpacity>

        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

        {guidance && (
          <View style={styles.guidanceContainer}>
            <Text style={styles.guidanceText}>{guidance}</Text>
          </View>
        )}
      </View>
    </>
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
  text: {
    fontSize: 16,
    marginTop: 5,
  },
  redButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  guidanceButton: {
    backgroundColor: 'red', // Different color for guidance button
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guidanceContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  guidanceText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
  },
});

export default Result;
