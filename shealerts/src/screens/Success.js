import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import BannerWithProfileIcon from '../components/BannerWithProfileIcon';

const Success = () => {
  return (
    <>
      <BannerWithProfileIcon />
      <View style={styles.container}>
        <View style={styles.layout}>
          <Text style={styles.head}>Successful!</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container fills the entire screen
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center', // Centers content both horizontally and vertically
  },
  layout: {
    width: '80%', // Adjust the width of the content to 80% of the screen width
    alignItems: 'center', // Centers the text horizontally within the layout
    justifyContent: 'center', // Centers the text vertically within the layout
  },
  head: {
    fontSize: 20,
    padding: 10,
    color: 'black',
    width: '100%',
    backgroundColor: 'red',
    textAlign: 'center',
    fontFamily: 'Martin monospace',
    fontWeight: 'bold',
    marginVertical: 50,
  },
});

export default Success;
