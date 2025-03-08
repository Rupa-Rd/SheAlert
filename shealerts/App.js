import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./src/screens/Landing";
import Registration from "./src/screens/Registration";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";

const Stack = createStackNavigator();

export default function App() {
  return (
    
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SheAlert" component={Landing} options={{ headerShown: false }}/>
        <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      </Stack.Navigator>
      </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
