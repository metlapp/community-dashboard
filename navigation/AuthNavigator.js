import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import VerifyEmail from "../screens/VerifyEmailScreen";
import TermsOfService from "../screens/TermsOfService";
import PrivacyPolicy from "../screens/PrivacyPolicy";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmail}
        options={{ title: "Forgot your password?" }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ title: "Set new password" }}
      />
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfService}
        options={{ title: "Terms of Service" }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ title: "Privacy Policy" }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
