import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import { FormContext } from "../auth/context";
import RegisterEmail from "./RegisterEmail";
import RegisterName from "./RegisterName";
import RegisterPassword from "./RegisterPassword";

export default function RegistrationScreen() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData, step, setStep }}>
      <SafeAreaView style={styles.container}>
        {step === 1 ? (
          <>
            <Text style={styles.text}>Registration Page</Text>
            <Text style={styles.text}>Step 1: Enter your email</Text>
            <RegisterEmail email={formData.email} errorTest={true} />
          </>
        ) : step === 2 ? (
          <>
            <Text style={styles.text}>Registration Page</Text>
            <Text style={styles.text}>Step 2: Enter your password</Text>
            <RegisterPassword />
          </>
        ) : step === 3 ? (
          <>
            <Text style={styles.text}>Registration Page</Text>
            <Text style={styles.text}>Step 3: Enter your name</Text>
            <RegisterName name={formData.name} />
          </>
        ) : (
          <>
            <Text style={styles.text}>Registration Successful!</Text>
            {console.log(formData)}
          </>
        )}
      </SafeAreaView>
    </FormContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 30,
    marginTop: 5,
  },
});
