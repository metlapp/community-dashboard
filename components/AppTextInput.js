import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import PropTypes from "prop-types";
import defaultStyles, {mediumGrey} from "../config/defaultStyles";

export default function AppTextInput({
  autoCapitalize,
  width = "100%",
  ...props
}) {
  return (
    <View style={{ width }}>
      <TextInput
        autoCapitalize={autoCapitalize}
        placeholderTextColor={mediumGrey}
        style={defaultStyles.TextInput}
        {...props}
      />
    </View>
  );
}

AppTextInput.propTypes = {
  autoCapitalize: PropTypes.string,
  width: PropTypes.string,
};
