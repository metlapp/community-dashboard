import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  const [user, setUser] = React.useState({
    name: "Dawson",
    email: "",
    password: "",
  });
  return (
    <SafeAreaView>
      <View>
        <LoginScreen />
      </View>
    </SafeAreaView>
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
