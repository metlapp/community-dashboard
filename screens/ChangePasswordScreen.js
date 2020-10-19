import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import * as Crypto from "expo-crypto";

import { SafeAreaView, StyleSheet, Text } from "react-native";
import AppFormField from "../components/AppFormField";
import Form from "../components/Form";
import SubmitButton from "../components/SubmitButton";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";

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
  const [errorVisible, setErrorVisible] = useState(false);
  const [error, setError] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  useEffect(() => {
    setSuccessVisible(false);
    setErrorVisible(false);
  }, []);

  const resetForm = (values) => {
    values["newPassword"] = "";
    values["currentPassword"] = "";
    values["confirmNewPassword"] = "";
  };

  const handleSubmit = async (values) => {
    setErrorVisible(false);
    if (values["newPassword"] !== values["confirmNewPassword"]) {
      setError("Please make sure new passwords match!");
      setErrorVisible(true);
      return;
    }
    values["newPassword"] === values["confirmNewPassword"];
    const currentPassword = await runCrypto(values["currentPassword"]);
    if (user.password !== currentPassword) {
      setError("Incorrect password");
      setErrorVisible(true);
      return;
    }
    user.password = await runCrypto(values["newPassword"]);
    setErrorVisible(false);
    setSuccessVisible(true);
    resetForm(values);
    setTimeout(() => {
      setSuccessVisible(false);
    }, 5000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Change your password</Text>
      <Form
        className="form"
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
          className="currentPassword"
          autoFocus
          onFocus={() => setErrorVisible(false)}
          secureTextEntry
          placeholder="Current Password"
          name="currentPassword"
          style={styles.TextInput}
        />
        <AppFormField
          id="newPassword"
          secureTextEntry
          placeholder="New Password"
          name="newPassword"
          style={styles.TextInput}
        />
        <AppFormField
          id="confirmPassword"
          secureTextEntry
          placeholder="Confirm Password"
          name="confirmNewPassword"
          style={styles.TextInput}
        />
        <ErrorMessage
          error={error}
          visible={errorVisible}
          className="errorMessage"
        />
        <SubmitButton className="submit" title="Save" />
        <SuccessMessage
          success="Password changed successfully"
          visible={successVisible}
        />
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
