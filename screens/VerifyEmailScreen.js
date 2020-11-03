import React, { useState } from "react";
import axios from "axios";
import { SafeAreaView, StyleSheet } from "react-native";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import AppFormField from "../components/AppFormField";
import defaultStyles from "../config/defaultStyles";
import ErrorMessage from "../components/ErrorMessage";
import Form from "../components/Form";
import SubmitButton from "../components/SubmitButton";
import SuccessMessage from "../components/SuccessMessage";
import PropTypes from "prop-types";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

export default function VerifyEmailScreen({ navigation }) {
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const url = "http://127.0.0.1:8000/api/password_reset/";

  const sendEmail = async (values) => {
    await axios.post(url, { email: values["email"] }).then(() => {
      try {
        setErrorVisible(false);
        setSuccessVisible(true);
        setTimeout(() => {
          setSuccessVisible(false);
        }, 2500);
      } catch (error) {
        setErrorVisible(true);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form
        initialValues={{ email: "" }}
        onSubmit={(values) => {
          sendEmail(values);
          values["email"] = "";
        }}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="email"
          placeholder="Enter your email"
          style={defaultStyles.TextInput}
          testID="email"
          keyboardType="email-address"
        />

        <ErrorMessage
          error="Could not communicate with server, please try again."
          visible={errorVisible}
        />

        <SuccessMessage
          testID="success"
          placeholder="success"
          success="An email will be sent to the provided email address with details on how to reset your password"
          visible={successVisible}
          containerStyles={{
            height: 100,
            textAlign: "center",
            width: "100%",
          }}
          messageStyles={{ height: 100, fontWeight: "600", padding: 10 }}
        />

        <SubmitButton title="Submit" />

        <AppButton title="Back" onPress={() => navigation.navigate("Login")} />
      </Form>
    </SafeAreaView>
  );
}

VerifyEmailScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
});
