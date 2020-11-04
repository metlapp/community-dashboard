import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import PropTypes from "prop-types";
export default function AppButton({ width = "100%", title, onPress }) {
  return (
    <Button
      mode="contained"
      style={[styles.button, { width }]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </Button>
  );
}

AppButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
