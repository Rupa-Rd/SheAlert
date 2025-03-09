import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./src/screens/Landing";
import Registration from "./src/screens/Registration";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Success from "./src/screens/Success";
import Profile from "./src/screens/Profile";
import Result from "./src/screens/Result";
import Guidance from "./src/screens/Guidance";
import { UserProvider } from "./src/components/UserContext";

const Stack = createStackNavigator();

export default function App() {
  return (
      <UserProvider>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SheAlert" component={Landing} options={{ headerShown: false }}/>
        <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Success" component={Success} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
        <Stack.Screen name="Result" component={Result} options={{ headerShown: false }}/>
        <Stack.Screen name="Guidance" component={Guidance} options={{ headerShown: false }}/>
      </Stack.Navigator>
      </NavigationContainer>
      </UserProvider>
    
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
