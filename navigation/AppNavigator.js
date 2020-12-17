import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconButton } from "react-native-paper";
import { primaryColor, textColor } from "../config/defaultStyles";

import AccountScreen from "../screens/AccountScreen";
import PersonalInfoScreen from "../screens/PersonalInfoScreen";
import NotificationScreen from "../screens/NotificationScreen";
import useNotifications from "../hooks/useNotifications";
import navigation from "./rootNavigation";
import * as Notifications from "expo-notifications";
import HomeScreen from "../screens/HomeScreen";
import AuthContext from "../auth/Context";
import { trackClick } from "../components/TrackClick";
import { screenOptions } from "../components/Header";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

function HomeStackScreen() {
  const authContext = useContext(AuthContext);
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: authContext.user.organization_data.name }}
      />
      <HomeStack.Screen name="Notification" component={NotificationScreen} />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreen() {
  const authContext = useContext(AuthContext);
  return (
    <ProfileStack.Navigator screenOptions={screenOptions}>
      <ProfileStack.Screen
        name="Profile"
        component={AccountScreen}
        options={{ title: authContext.user.first_name }}
      />
      <ProfileStack.Screen
        name="PersonalInfo"
        component={PersonalInfoScreen}
        options={{ title: "Edit personal info" }}
      />
    </ProfileStack.Navigator>
  );
}

const AppNavigator = ({ testToken }) => {
  const authContext = useContext(AuthContext);
  useNotifications((notification) => {
    trackClick(authContext.user.id, null, "VIEWED", "NOTIFICATION");
    console.log(notification);
    // If content type is content, we redirect to home page, otherwise we will go to the notification screen
    if (
      notification.notification.request.content.data.content_type === "Content"
    ) {
      navigation.navigate("Home");
    } else if (
      // This will most likely need to be changed once our backend is sending the notifications
      notification.actionIdentifier ===
      "expo.modules.notifications.actions.DEFAULT"
    ) {
      navigation.navigate("Notification", {
        notification,
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

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "account-circle" : "account-circle-outline";
          }

          return <IconButton icon={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: primaryColor,
        inactiveTintColor: textColor,
        labelStyle: { marginBottom: 4, marginTop: -4 },
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
