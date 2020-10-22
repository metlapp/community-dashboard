import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default function AppTextInput({
  autoCapitalize,
  width = "100%",
  ...props
}) {
  return (
    <View style={[styles.container, { width }]}>
      <TextInput
        autoCapitalize={autoCapitalize}
        style={[styles.TextInput]}
        {...props}
      />
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
