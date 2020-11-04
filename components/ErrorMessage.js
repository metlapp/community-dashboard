import React from "react";
import { StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
function ErrorMessage({ error, styling, visible }) {
  if (!visible || !error) return null;

  return <Text style={{ ...styles.error, ...styling }}>{error}</Text>;
}
ErrorMessage.propTypes = {
  error: PropTypes.bool,
  visible: PropTypes.bool,
};
const styles = StyleSheet.create({
  error: { color: "red" },
});

export default ErrorMessage;
