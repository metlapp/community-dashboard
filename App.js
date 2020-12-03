import React, { useEffect } from "react";
import { makeUrl } from "expo-linking";
import { NavigationContainer, useLinking } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { theme, navigationTheme } from "./config/defaultStyles";
import { decode, encode } from "base-64";
import HomeScreen from "./screens/HomeScreen";
import AccountScreen from "./screens/AccountScreen";
import AllVideosScreen from "./screens/AllVideosScreen";
import AppNavigator from "./navigation/AppNavigator";
import QuestionScreen from "./screens/QuestionScreen";
import AuthContext from "./auth/Context";
import AuthNavigator from "./navigation/AuthNavigator";
import authStorage from "./auth/Storage";
import { navigationRef } from "./navigation/rootNavigation";

export default function App() {
  const [user, setUser] = React.useState();
  const prefix = makeUrl("/");

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
  const ref = React.useRef();

  // connecting password reset url to PasswordResetScreen
  const { getInitialState } = useLinking(ref, {
    prefixes: [prefix],
    config: {
      ResetPassword: "resetPassword/reset/:token",
    },
  });

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    getInitialState()
      .catch(() => {})
      .then((state) => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <PaperProvider theme={theme}>
        <NavigationContainer
          initialState={initialState}
          ref={(ref, navigationRef)}
          theme={navigationTheme}
        >
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
}
