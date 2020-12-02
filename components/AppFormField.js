import React from "react";
import { useFormikContext } from "formik";
import AppTextInput from "./AppTextInput";
import PropTypes from "prop-types";

function AppFormField({
  autoCapitalize = "none",
  autoCorrect = false,
  onFocus,
  name,
  width,
  value,
  ...otherProps
}) {
  const {
    setFieldTouched,
    setFieldValue,
    values,
    touched,
    getFieldMeta,
  } = useFormikContext();

  const hasError = !!getFieldMeta(name).error && !!touched[name];

  return (
    <>
      <AppTextInput
        error={hasError}
        autoCapitalize={autoCapitalize}
        onBlur={() => setFieldTouched(name)}
        onFocus={onFocus}
        onChangeText={(text) => {
          setFieldValue(name, text);
        }}
        value={value || values[name]}
        width={width}
        {...otherProps}
      />
    </>
  );
}

AppFormField.propTypes = {
    autoCapitalize: PropTypes.string,
    autoCorrect: PropTypes.bool,
    onFocus: PropTypes.func,
    name: PropTypes.string,
    width: PropTypes.string,
    value: PropTypes.string,
};
export default AppFormField;
