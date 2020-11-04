import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

function SuccessMessage({ success, visible, containerStyles, messageStyles }) {
  if (!visible || !success) return null;

  return (
    <View style={[styles.container, { ...containerStyles }]}>
      <Text style={[styles.success, { ...messageStyles }]}>{success}</Text>
    </View>
  );
}

SuccessMessage.propTypes = {
  success: PropTypes.string,
  visible: PropTypes.bool,
  containerStyles: PropTypes.object,
  messageStyles: PropTypes.object,
};

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
