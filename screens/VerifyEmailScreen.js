import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import * as Yup from "yup";

import AppButton from "../components/AppButton";
import AppFormField from "../components/AppFormField";
import runCrypto from "../auth/crypto-hashing";
import defaultStyles from "../config/defaultStyles";
import ErrorMessage from "../components/ErrorMessage";
import Form from "../components/Form";
import AuthContext from "../auth/Context";
import SubmitButton from "../components/SubmitButton";
import SuccessMessage from "../components/SuccessMessage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

export default function RegisterPassword({ navigation }) {
  const [successVisible, setSuccessVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Form
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          setSuccessVisible(true);
          values["email"] = "";
          setTimeout(() => {
            setSuccessVisible(false);
            navigation.navigate("Login");
            navigation.navigate("ResetPassword");
          }, 5000);
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

        <SuccessMessage
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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
});
