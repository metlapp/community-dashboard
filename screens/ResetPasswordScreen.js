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

  const { token } = route.params;
  const url = 'http://127.0.0.1:8000/api/password_reset/confirm/'
  const savePassword = async (values) => {
    if (values.password !== values.confirmPassword) {
      setErrorVisible(true);
      return;
    }
    await axios.post(url, { token, password: values.password });
    setErrorVisible(false);
    navigation.navigate('Login')
  };

  useEffect(() => {
    let unmounted = false;
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Form
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={(values) => savePassword(values)}
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
        <ErrorMessage error="Passwords do not match" visible={errorVisible} />
        <SubmitButton title="Save" />
      </Form>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
