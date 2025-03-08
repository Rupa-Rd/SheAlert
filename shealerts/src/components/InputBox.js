import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const InputBox = ({ name, value, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={name} // Placeholder set to the 'name' prop passed to the component
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry} // For password input field
        placeholderTextColor="gray" // Placeholder text color
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20, // Adds space between input fields
  },
  input: {
    height: 50,
    width: 350,
    borderColor: 'red', // Red outline color for the input box
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default InputBox;
