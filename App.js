import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AccountScreen from "./screens/AccountScreen";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  const [user, setUser] = React.useState({
    name: "Dawson",
    email: "",
    password: "",
  });
  return (
    <PaperProvider>
      <AccountScreen setUser={setUser} user={user} />
    </PaperProvider>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
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
