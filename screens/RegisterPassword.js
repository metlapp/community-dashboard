import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import AppButton from "../components/AppButton";
import AppFormField from "../components/AppFormField";
import runCrypto from "../auth/crypto-hashing";
import defaultStyles from "../config/defaultStyles";
import ErrorMessage from "../components/ErrorMessage";
import Form from "../components/Form";
import { FormContext } from "../auth/Context";
import SubmitButton from "../components/SubmitButton";

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
        onSubmit={async (values) => {
          if (values.password !== values.confirmPassword) {
            setErrorVisible(true);
            return;
          }
          const password = await runCrypto(values.password);
          setFormData(() => ({
            ...formData,
            password: password,
          }));
          setErrorVisible(false);
          setStep((step) => step + 1);
        }}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="password"
          placeholder="Enter your password"
          secureTextEntry
          style={defaultStyles.TextInput}
          testID="pass"
        />
        <AppFormField
          name="confirmPassword"
          placeholder="Confirm password"
          secureTextEntry
          style={defaultStyles.TextInput}
          testID="confirmPass"
        />
        <ErrorMessage error="Passwords do not match" visible={errorVisible} />
        <SubmitButton title="Next" />
        <AppButton title="Back" onPress={() => setStep((step) => step - 1)} />
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
