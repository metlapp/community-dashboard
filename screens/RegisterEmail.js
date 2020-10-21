import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import AppFormField from "../components/AppFormField";
import Form from "../components/Form";
import AppButton from "../components/AppButton";
import { FormContext } from "../auth/context";

export default function RegisterEmail() {
  const formContext = useContext(FormContext);
  return (
    <View style={styles.container}>
      <Form initialValues={{ email: "" }} style={styles.form}>
        <AppFormField
          placeholder="Enter your email"
          name="email"
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
