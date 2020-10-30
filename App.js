import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import AuthContext from "./auth/Context";
import AccountScreen from "./screens/AccountScreen";
import { Provider as PaperProvider } from "react-native-paper";
import authStorage from "./auth/Storage";
import AuthNavigator from "./navigation/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import {decode, encode} from 'base-64'

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


  if (!global.btoa) {
      global.btoa = encode;
  }
  
  if (!global.atob) {
      global.atob = decode;
  } 
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <PaperProvider>
        <NavigationContainer>
          {user ? <AccountScreen /> : <AuthNavigator />}
        </NavigationContainer>
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
