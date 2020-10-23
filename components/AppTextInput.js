import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

export default function AppTextInput({ width = "100%", ...props }) {
  return (
    <View style={[styles.container, { width }]}>
      <TextInput style={[styles.TextInput]} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    justifyContent: "center",
    marginVertical: 15,
    height: 55,
  },
});
