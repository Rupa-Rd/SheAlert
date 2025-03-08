import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Landing({ navigation }) {
  const navigateToRegistration = () => {
    navigation.navigate("Registration");
  };
  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        <Text style={styles.head}>SheAlert</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToRegistration}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.marginTop]} // Add margin to space the buttons
          onPress={navigateToLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "white",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  layout: {
    height: "80%",
    width: "80%",
    alignContent: "center",
    justifyContent: "center",
  },
  head: {
    fontSize: 45,
    color: "black",
    textAlign: "center",
    fontFamily: "Martin monospace",
    fontWeight: "bold",
    marginVertical: 50,
  },
  button: {
    backgroundColor: "red", // Set the button color to red
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center", // To center the text inside the button
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  marginTop: {
    marginTop: 20, // Add space between buttons
  },
});

export default Landing;
