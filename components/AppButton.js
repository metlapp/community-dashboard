import React from "react";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import PropTypes from "prop-types";
import defaultStyles from "../config/defaultStyles";


export default function AppButton({ width = "100%", title, onPress, compact = false, ...props }) {

  let style = defaultStyles.button;
  if (compact) style = [style, defaultStyles.compactButton];

  return (
    <Button
      mode="contained"
      style={[style, { width }]}
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
  compact: PropTypes.bool,
};
