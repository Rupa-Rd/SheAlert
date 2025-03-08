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

const Login = () => {
  // State for inputs
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  // Handle Login logic
  const handleLogin = () => {
    // Validate Mobile Number
    if (!isValidMobileNumber(mobileNumber)) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    // For now, logging the form data. You can replace this with your actual login logic.
    console.log({
      mobileNumber,
      password,
    });

    // Navigate to the next page or display success
    // Add your actual login authentication here
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
          <Text style={styles.title}>Login</Text>

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

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
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
    justifyContent: 'center',
    paddingHorizontal: 30, // Set horizontal padding for the content inside ScrollView
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 10, // Margin to prevent cutting off
  },
  button: {
    backgroundColor: 'red',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Login;
