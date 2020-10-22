import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import AppFormField from "../components/AppFormField";
import Form from "../components/Form";
import AppButton from "../components/AppButton";
import { FormContext } from "../auth/context";
import SubmitButton from "../components/SubmitButton";
import ErrorMessage from "../components/ErrorMessage";
import defaultStyles from "../config/defaultStyles";

const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(8).label("Password"),
  confirmPassword: Yup.string().required().min(8).label("Confirm Password"),
});

export default function RegisterPassword() {
  const [errorVisible, setErrorVisible] = useState(false);
  const { setStep, formData, setFormData } = useContext(FormContext);
  return (
    <View style={styles.container}>
      <Form
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={(values) => {
          if (values.password !== values.confirmPassword) {
            setErrorVisible(true);
            return;
          }
          setFormData(() => ({
            ...formData,
            password: values.password,
          }));
          setErrorVisible(false);
          setStep((step) => step + 1);
        }}
        validationSchema={validationSchema}
      >
        <AppFormField
          testID="pass"
          placeholder="Enter your password"
          name="password"
          style={defaultStyles.TextInput}
        />
        <AppFormField
          testID="confirmPass"
          placeholder="Confirm password"
          name="confirmPassword"
          style={defaultStyles.TextInput}
        />
        <ErrorMessage error="Passwords do not match" visible={errorVisible} />
        <AppButton title="Back" onPress={() => setStep((step) => step - 1)} />
        <SubmitButton title="Next" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  TextInput: {
    lineHeight: 25,
    fontSize: 20,
    paddingLeft: 10,
  },
});
