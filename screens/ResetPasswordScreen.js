import React, { useEffect, useState } from "react";
import axios from "axios";
import { SafeAreaView, StyleSheet } from "react-native";
import * as Yup from "yup";

import AppFormField from "../components/AppFormField";
import defaultStyles from "../config/defaultStyles";
import ErrorMessage from "../components/ErrorMessage";
import Form from "../components/Form";
import SubmitButton from "../components/SubmitButton";

const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(8).label("Password"),
  confirmPassword: Yup.string().required().min(8).label("Confirm Password"),
});

export default function ResetPasswordScreen({ navigation, route }) {
  const [errorVisible, setErrorVisible] = useState(false);
  const [error, setError] = useState("");

  // Getting token from emailed URL
  const { token } = route.params;

  const url = "http://127.0.0.1:8000/api/password_reset/confirm/";
  const savePassword = async (values) => {
    setErrorVisible(false);
    if (values.password !== values.confirmPassword) {
      setErrorVisible(true);
      setError("Passwords do not match.");
      return;
    }
    await axios
      .post(url, { token, password: values.password })
      .then((data) => {
        // if password reset was successful, go to login screen
        if (data.status === 200) {
          navigation.navigate("Login");
        }
      })
      .catch((err) => {
        switch (err.response.status) {
          // setting error based on status code
          case 404:
            setErrorVisible(true);
            setError(
              "Invalid token. Please request a new password reset email."
            );
            return;
          case 400:
            setErrorVisible(true);
            setError(
              "Password cannot be similar to your first name or be a previously used password. Please try again."
            );
            return;
          default:
            navigation.navigate("Login");
        }
        setErrorVisible(true);
        setError(
          "Can not connect to server, ensure you have a working internet connection and try again"
        );
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={(values) => {
          savePassword(values);
          values.password = "";
          values.confirmPassword = "";
        }}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="password"
          placeholder="New password"
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
        <ErrorMessage
          error={error}
          styling={{ justifyContent: "center", height: 60, fontSize: 20 }}
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
    width: "100%",
  },
});
