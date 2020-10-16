import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default function AppTextInput({ width = "100%", ...props }) {
  return (
    <View style={[styles.container, { width }]}>
      <TextInput  {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey",
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
});