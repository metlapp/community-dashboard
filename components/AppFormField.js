import React from "react";
import { useFormikContext } from "formik";
import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";
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
    errors,
    values,
    touched,
  } = useFormikContext();

  return (
    <>
      <AppTextInput
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
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

AppFormField.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
};
export default AppFormField;
