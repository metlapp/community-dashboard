import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from "react-native-paper";
import { primaryColor, textColor } from "../config/defaultStyles";

import AccountScreen from "../screens/AccountScreen";
import PersonalInfoScreen from "../screens/PersonalInfoScreen";
import NotificationScreen from "../screens/NotificationScreen";
import useNotifications from "../hooks/useNotifications";
import navigation from "./rootNavigation";
import * as Notifications from "expo-notifications";
import QuestionScreen from "../screens/QuestionScreen";
import AllVideosScreen from "../screens/AllVideosScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={AllVideosScreen} />
      <HomeStack.Screen name="Notification" component={NotificationScreen} />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={AccountScreen} />
      <ProfileStack.Screen name="PersonalInfo" component={PersonalInfoScreen} options={{ title: 'Personal Info' }} />
    </ProfileStack.Navigator>
  );
}

const AppNavigator = ({ testToken }) => {
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
  }, testToken);



  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'account-circle' : 'account-circle-outline';
                }

                return <IconButton icon={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: primaryColor,
              inactiveTintColor: textColor,
            }}
      >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>

  );
};

export default AppNavigator;
