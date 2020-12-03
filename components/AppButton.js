import React from "react";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import PropTypes from "prop-types";
import defaultStyles from "../config/defaultStyles";


export default function AppButton({ width = "100%", title, onPress, ...props }) {
  return (
    <Button
      mode="contained"
      style={[defaultStyles.button, { width }]}
      onPress={onPress}
      {...props}

    >
      <Text style={defaultStyles.buttonText}>{title}</Text>
    </Button>
  );
}

AppButton.propTypes = {
  width: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
};
