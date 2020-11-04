import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import PropTypes from "prop-types";

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

AppTextInput.propTypes = {
  autoCapitalize: PropTypes.string,
  width: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    justifyContent: "center",
    marginVertical: 15,
    height: 55,
  },
});
