import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#2dbc4e",
    height: 45,
    justifyContent: "center",
    opacity: 0.8,
    width: "85%",
  },
  success: {
    color: "white",
    fontSize: 20,
  },
});

export default SuccessMessage;
