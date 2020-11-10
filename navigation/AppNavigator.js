import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import NotificationScreen from "../screens/NotificationScreen";
import useNavigation from "../hooks/useNavigation";
import navigation from "./rootNavigation";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  // will be moved to homepage when its implemented

  useNavigation((notification) => {
    console.log(notification);
    navigation.navigate("Notification", {
      title: notification.notification.request.content.title,
      body: notification.notification.request.content.body,
    });
  });

  return (
    <Stack.Navigator initialRouteName="Account">
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
