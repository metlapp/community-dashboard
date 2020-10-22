import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import AppFormField from "../components/AppFormField";
import Form from "../components/Form";
import AppButton from "../components/AppButton";
import { FormContext } from "../auth/context";
import SubmitButton from "../components/SubmitButton";

const handleSavePassword = async (pass, confirmPass) => {};

export default function RegisterPassword() {
  const { step, setStep, formData, setFormData } = useContext(FormContext);
  return (
    <View style={styles.container}>
      <Form
        initialValues={{ password: "", confirmPassword: "" }}
        style={styles.form}
        onSubmit={(values) => {
          if (values.password !== values.confirmPassword) {
            return;
          }
          setFormData(() => ({
            ...formData,
            password: values.password,
          }));
          setStep(step + 1);
        }}
      >
        <AppFormField
          placeholder="Enter your password"
          name="password"
          style={styles.TextInput}
        />
        <AppFormField
          placeholder="Confirm password"
          name="confirmPassword"
          style={styles.TextInput}
        />
        <AppButton title="Back" onPress={() => setStep(step - 1)} />
        <SubmitButton title="Next" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  form: {
    width: "70%",
  },
  TextInput: {
    lineHeight: 25,
    fontSize: 20,
    paddingLeft: 10,
  },
});
