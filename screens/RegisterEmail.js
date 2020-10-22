import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import AppFormField from "../components/AppFormField";
import Form from "../components/Form";
import AppButton from "../components/AppButton";
import { FormContext } from "../auth/context";
import SubmitButton from "../components/SubmitButton";

const saveEmail = async (values, obj) => {
  const { setFormData, formData } = obj;
  setFormData({ ...formData, email: values.email });
};

// async (values) => {
//     await formContext.setFormData({
//       ...formContext.formData,
//       email: values.email,
//     });

export default function RegisterEmail({ setFormData, formData }) {
  const { step, setStep } = useContext(FormContext);
  return (
    <View style={styles.container}>
      <Form
        initialValues={{ email: "" }}
        innerRef={emailRef}
        style={styles.form}
        onSubmit={(values) => {
          setFormData(() => ({
            ...formData,
            email: values.email,
          }));
          setStep((step) => step + 1);
        }}
      >
        <AppFormField
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Enter your email"
          name="email"
          style={styles.TextInput}
        />
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
