import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function Notification({ title, body }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{title}</Text>
      <Text>{body}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
