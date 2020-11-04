import React from "react";
import { useFormikContext } from "formik";
import AppButton from "./AppButton";
import PropTypes from "prop-types";

function SubmitButton({ onPress, title, width }) {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      title={title}
      onPress={() => {
        handleSubmit();
        onPress;
      }}
      width={width}
    />
  );
}

SubmitButton.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
};

export default SubmitButton;
