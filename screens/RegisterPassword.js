import React from "react";
import { StyleSheet, Text, View } from "react-native";

import SubmitButton from "../components/SubmitButton";
import AppFormField from "../components/AppFormField";
import Form from "../components/Form";
import AppButton from "../components/AppButton";

export default function RegisterPassword() {
  return (
    <View style={styles.container}>
      <Form
        initialValues={{ password: "", confirmPassword: "" }}
        style={styles.form}
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
        <AppButton title="Next" />
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
