import React from "react";
import { StyleSheet, Text, View } from "react-native";

import SubmitButton from "../components/SubmitButton";
import AppFormField from "../components/AppFormField";
import Form from "../components/Form";
import AppButton from "../components/AppButton";

export default function RegisterName() {
  return (
    <View style={styles.container}>
      <Form initialValues={{ name: "" }} style={styles.form}>
        <AppFormField
          placeholder="Enter your name"
          name="name"
          style={styles.TextInput}
          width="100%"
        />
        <View style={styles.buttonContainer}>
          <AppButton title="Back" width={100} />
          <SubmitButton title="Save" width={500} />
        </View>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "yellow",
  },
  form: {
    height: "100%",
    width: "100%",
    backgroundColor: "yellow",
  },
  TextInput: {
    lineHeight: 25,
    fontSize: 20,
    paddingLeft: 10,
  },
});
