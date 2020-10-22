import React from "react";
import { StyleSheet, Text } from "react-native";

function ErrorMessage({ error, styling, visible }) {
  if (!visible || !error) return null;

  return <Text style={{ ...styles.error, ...styling }}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: { color: "red" },
});

export default ErrorMessage;
