import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import AuthContext from "./auth/Context";
import AccountScreen from "./screens/AccountScreen";
import { Provider as PaperProvider } from "react-native-paper";
import authStorage from "./auth/Storage";

export default function App() {
  const [user, setUser] = React.useState();

  const restoreUser = async () => {
    const userData = await authStorage.getUser();

    //If no user data is in the storage than just return which shows the login screen
    if (!userData) {
      setUser();
      return;
    }
    setUser(userData);
  };

  //Checks the storage on open of the app
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
