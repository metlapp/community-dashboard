import React from "react";
import { useFormikContext } from "formik";
import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";
import PropType from "prop-types";

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

AppFormField.propType = {
  id: PropType.string,
  placeholder: PropType.string,
  name: PropType.string,
};
export default AppFormField;
