import React, { useContext, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import SubmitButton from "../components/SubmitButton";
import AppFormField from "../components/AppFormField";
import Form from "../components/Form";
import AppButton from "../components/AppButton";
import { FormContext } from "../auth/context";

export default function RegisterName() {
  const [name, setName] = useState();
  const { setStep, formData, setFormData } = useContext(FormContext);

  return (
    <View style={styles.container}>
      <Form
        initialValues={{ name: "" }}
        style={styles.form}
        onSubmit={(values) => {
          setFormData(() => ({
            ...formData,
            name: values.name,
          }));
        }}
      >
        <AppFormField
          placeholder="Enter your name"
          name="name"
          style={styles.TextInput}
          setValue={setName}
          width="100%"
        />
        <View>
          <AppButton title="Back" onPress={() => setStep((step) => step - 1)} />
          <SubmitButton title="Save" />
        </View>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
