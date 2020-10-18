import React from "react";
import { StyleSheet, Text } from "react-native";

function SuccessMessage({ success, visible }) {
  if (!visible || !success) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.success}>{success}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2dbc4e",
    opacity: 0.8,
  },
  success: {
    color: "white",
    fontSize: 20,
  },
});

export default SuccessMessage;
