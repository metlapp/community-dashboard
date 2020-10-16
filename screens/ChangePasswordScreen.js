import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import * as Crypto from "expo-crypto";

import { SafeAreaView, StyleSheet, Text } from "react-native";
import AppFormField from "../components/AppFormField";
import Form from "../components/Form";
import SubmitButton from "../components/SubmitButton";
import ErrorMessage from "../components/ErrorMessage";

const runCrypto = async (pass) => {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    pass
  );
  return digest;
};

const user = {
  id: 4,
  name: "john",
  password: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
};

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required().min(8).label("Current Password"),
  newPassword: Yup.string().required().min(8).label("New Password"),
  confirmNewPassword: Yup.string().required().min(8).label("Confirm Password"),
});

export default function ChangePasswordScreen() {
  useEffect(() => {}, []);
  const [errorVisible, setErrorVisible] = useState(false);

  const handleSubmit = async (values) => {
    setErrorVisible(false);
    if (values["newPassword"] !== values["confirmNewPassword"]) {
      setErrorVisible(true);
      return;
    }
    values["newPassword"] === values["confirmNewPassword"];
    const currentPassword = await runCrypto(values["currentPassword"]);
    if (user.password === currentPassword) {
      user.password = await runCrypto(values["newPassword"]);
      console.log(user.password);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Change your password</Text>
      <Form
        style={styles.form}
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoFocus
          secureTextEntry
          placeholder="Current Password"
          name="currentPassword"
          style={styles.TextInput}
        />
        <AppFormField
          secureTextEntry
          placeholder="New Password"
          name="newPassword"
          style={styles.TextInput}
        />
        <AppFormField
          secureTextEntry
          placeholder="Confirm Password"
          name="confirmNewPassword"
          style={styles.TextInput}
        />
        <ErrorMessage
          error="Please make sure new passwords match"
          visible={errorVisible}
        />
        <SubmitButton title="Save" />
      </Form>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  form: {
    width: "70%",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 30,
    marginTop: 5,
  },
  TextInput: {
    lineHeight: 25,
    fontSize: 20,
    paddingLeft: 10,
  },
});
