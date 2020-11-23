import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import NotificationScreen from "../screens/NotificationScreen";
import useNotifications from "../hooks/useNotifications";
import navigation from "./rootNavigation";
import * as Notifications from "expo-notifications";
import QuestionScreen from "../screens/QuestionScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  useNotifications((notification) => {
    if (
      // This will most likely need to be changed once our backend is sending the notifications
      notification.actionIdentifier ===
      "expo.modules.notifications.actions.DEFAULT"
    ) {
      navigation.navigate("Notification", {
        title: notification.notification.request.content.title,
        body: notification.notification.request.content.body,
      });
    } else {
      //Will record answer in future
      Notifications.dismissNotificationAsync(
        notification.notification.request.identifier
      );
      console.log(notification.notification.request.identifier);
      console.log(notification.actionIdentifier);
    }
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
      <Stack.Screen
        name="Question"
        component={QuestionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
