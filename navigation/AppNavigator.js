import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import NotificationScreen from "../screens/NotificationScreen";
import useNotifications from "../hooks/useNotifications";
import navigation from "./rootNavigation";
import QuestionScreen from "../screens/QuestionScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  // will be moved to homepage when its implemented

  useNotifications((notification) => {
    console.log(notification);
    navigation.navigate("Notification", {
      title: notification.notification.request.content.title,
      body: notification.notification.request.content.body,
    });
  });

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Question"
        component={QuestionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
