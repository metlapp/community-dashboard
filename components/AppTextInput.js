import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

import defaultStyles from "../config/styles";

export default function AppTextInput({ icon, width = "100%", ...props }) {
  return (
    <View style={[styles.container, { width }]}>
      <TextInput 
      placeholderTextColor={defaultStyles.colours.medium}
      style={defaultStyles.text} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colours.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});