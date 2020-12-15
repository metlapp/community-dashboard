import React, { useState} from "react";
import axios from "axios";
import {SafeAreaView, View} from "react-native";
import {Title} from "react-native-paper";
import * as Yup from "yup";

import AppFormField from "../components/AppFormField";
import defaultStyles from "../config/defaultStyles";
import ErrorMessage from "../components/ErrorMessage";
import Form from "../components/Form";
import SubmitButton from "../components/SubmitButton";

import {apiConfig} from "../config/config";

const validationSchema = Yup.object().shape({
  password: Yup.string().trim().required().min(8).label("New Password"),
  confirmPassword: Yup.string().trim().oneOf([Yup.ref('password'), null]).required().min(8).label("Confirm Password"),
});

export default function ResetPasswordScreen({ navigation, route }) {
  const [errorVisible, setErrorVisible] = useState(false);
  const [error, setError] = useState("");

  // Getting token from emailed URL
  const { token } = route.params;

  const savePassword = async (values) => {
    setErrorVisible(false);

    await axios
      .post(apiConfig.baseUrl + 'api/password_reset/confirm/', {token, password: values.password})
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
    <SafeAreaView>
      <View style={defaultStyles.mainContainer}>

        <View style={defaultStyles.formContainer}>

          <Form
            initialValues={{password: "", confirmPassword: ""}}
            onSubmit={(values) => {
              savePassword(values);
            }}
            validationSchema={validationSchema}
          >
            <Title style={defaultStyles.formFieldTitle}>Password</Title>
            <AppFormField
              name="password"
              placeholder="New password"
              secureTextEntry
              testID="pass"
            />
            <Title style={defaultStyles.formFieldTitle}>Confirm Password</Title>
            <AppFormField
              name="confirmPassword"
              placeholder="Repeat new password"
              secureTextEntry
              testID="confirmPass"
            />
            <ErrorMessage
              error={error}
              styling={{justifyContent: "center", height: 60, fontSize: 20}}
              visible={errorVisible}
            />
            <SubmitButton title="Save"/>
          </Form>
        </View>
      </View>
    </SafeAreaView>
  );
}
