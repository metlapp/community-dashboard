import React from "react";
import { useFormikContext } from "formik";

import AppButton from "./AppButton";

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

export default SubmitButton;
