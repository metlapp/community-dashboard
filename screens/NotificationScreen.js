import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Notification from "../components/Notification";

export default function NotificationScreen({ navigation, route }) {
  const { body, title } = route.params;

  return (
    <View>
      <Notification body={body} title={title} />
    </View>
  );
}

const styles = StyleSheet.create({});
