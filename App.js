import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import AsyncStorage from "@react-native-community/async-storage";
import AuthContext from "./auth/Context";
import HomeScreen from "./screens/HomeScreen";
import AccountScreen from "./screens/AccountScreen";
import { Provider as PaperProvider } from "react-native-paper";
import authStorage from "./auth/Storage";

export default function App() {
  const [user, setUser] = React.useState();

  const restoreUser = async () => {
    const userData = await authStorage.getUser();
    if (!userData) {
      setUser();
      return;
    }
    setUser(userData);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <PaperProvider>
        <View>{user ? <AccountScreen /> : <LoginScreen />}</View>
      </PaperProvider>
    </AuthContext.Provider>
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
