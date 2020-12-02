import React from "react";
import { useFormikContext } from "formik";
import AppButton from "./AppButton";
import PropTypes from "prop-types";

function SubmitButton({ onPress, title, width }) {
  const { handleSubmit, isValid, dirty } = useFormikContext();

  return (
    <AppButton
      title={title}
      onPress={() => {
        handleSubmit();
        onPress;
      }}
      width={width}
      disabled={!(isValid && dirty)}
    />
  );
}

SubmitButton.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  width: PropTypes.number,
};

export default SubmitButton;
