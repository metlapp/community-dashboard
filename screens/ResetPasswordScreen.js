import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import AppButton from "../components/AppButton";
import AppFormField from "../components/AppFormField";
import runCrypto from "../auth/crypto-hashing";
import defaultStyles from "../config/defaultStyles";
import ErrorMessage from "../components/ErrorMessage";
import Form from "../components/Form";
import AuthContext from "../auth/Context";
import SubmitButton from "../components/SubmitButton";

const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(8).label("Password"),
  confirmPassword: Yup.string().required().min(8).label("Confirm Password"),
});

export default function RegisterPassword() {
  const [errorVisible, setErrorVisible] = useState(false);
  const { user, setUser } = useContext(AuthContext);

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
        onSubmit={async (values) => {
          if (values.password !== values.confirmPassword) {
            setErrorVisible(true);
            return;
          }
          const password = await runCrypto(values.password);
          console.log(password);

          setUser({
            email: "email@email.com",
            name: "Dawson",
            password: password,
          });
          setMount(!mount);
          setErrorVisible(false);
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
