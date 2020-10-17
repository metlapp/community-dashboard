import React from "react";
import { StyleSheet, Text } from "react-native";

function SuccessMessage({ success, visible }) {
  if (!visible || !success) return null;

  return <Text style={styles.success}>{success}</Text>;
}

const styles = StyleSheet.create({
  success: { color: "green" },
});

export default SuccessMessage;
