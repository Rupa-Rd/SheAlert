import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import InputBox from '../components/InputBox'; // Import InputBox component
import BannerWithoutProfile from '../components/BannerWithoutProfile';

// Function to validate mobile number using a regex pattern
const isValidMobileNumber = (number) => {
  // Regex for validating a 10-digit mobile number (modify it to fit your country format)
  const regex = /^[0-9]{10}$/;
  return regex.test(number); // Returns true if the number is valid, false otherwise
};

const Registration = () => {
  // State for inputs
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emergencyContact1Name, setEmergencyContact1Name] = useState('');
  const [emergencyContact1Mobile, setEmergencyContact1Mobile] = useState('');
  const [emergencyContact2Name, setEmergencyContact2Name] = useState('');
  const [emergencyContact2Mobile, setEmergencyContact2Mobile] = useState('');

  // Handle Registration logic
  const handleRegister = () => {
    // Validate Mobile Numbers
    if (!isValidMobileNumber(mobileNumber)) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!isValidMobileNumber(emergencyContact1Mobile)) {
      Alert.alert('Invalid Emergency Contact 1 Mobile', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!isValidMobileNumber(emergencyContact2Mobile)) {
      Alert.alert('Invalid Emergency Contact 2 Mobile', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // For now, logging the form data. You can replace this with your actual registration logic.
    console.log({
      fullName,
      mobileNumber,
      password,
      emergencyContact1: { fullName: emergencyContact1Name, mobileNumber: emergencyContact1Mobile },
      emergencyContact2: { fullName: emergencyContact2Name, mobileNumber: emergencyContact2Mobile },
    });

    // Display success or proceed to next screen (e.g., navigate to Home or Login)
  };

  return (
    <>
      <BannerWithoutProfile />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView} // Removed padding
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Registration Page</Text>

          {/* Full Name Input */}
          <InputBox
            name="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />

          {/* Mobile Number Input */}
          <InputBox
            name="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />

          {/* Password Input */}
          <InputBox
            name="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true} // Password field
          />

          {/* Confirm Password Input */}
          <InputBox
            name="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true} // Password field
          />

          {/* Emergency Contact 1 Name */}
          <Text style={styles.contactText}>Emergency Contact 1</Text>
          <InputBox
            name="Full Name"
            value={emergencyContact1Name}
            onChangeText={setEmergencyContact1Name}
          />

          {/* Emergency Contact 1 Mobile Number */}
          <InputBox
            name="Mobile Number"
            value={emergencyContact1Mobile}
            onChangeText={setEmergencyContact1Mobile}
          />

          {/* Emergency Contact 2 Name */}
          <Text style={styles.contactText}>Emergency Contact 2</Text>
          <InputBox
            name="Full Name"
            value={emergencyContact2Name}
            onChangeText={setEmergencyContact2Name}
          />

          {/* Emergency Contact 2 Mobile Number */}
          <InputBox
            name="Mobile Number"
            value={emergencyContact2Mobile}
            onChangeText={setEmergencyContact2Mobile}
          />

          {/* Register Button */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10, // Adjusted for better top spacing
  },
  scrollView: {
    flexGrow: 1, // Ensure content fills the screen properly without extra padding
    justifyContent: 'flex-start',
    paddingHorizontal: 30, // Set horizontal padding for the content inside ScrollView
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 5, // Margin to prevent cutting off
  },
  contactText: {
    fontSize: 16,
    marginBottom: 15,
    marginTop: 5,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'red',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Registration;
