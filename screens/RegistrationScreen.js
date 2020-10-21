import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { FormContext } from "../auth/context";

import RegisterEmail from "./RegisterEmail";
import RegisterName from "./RegisterName";
import RegisterPassword from "./RegisterPassword";

export default function RegistrationScreen({}) {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Registration Page</Text>
        {stage === 1 ? (
          <>
            <Text style={styles.text}>Step 1: Enter your email</Text>
            <RegisterEmail />
          </>
        ) : stage === 2 ? (
          <>
            <Text style={styles.text}>Step 2: Enter your password</Text>
            <RegisterPassword />
          </>
        ) : (
          <>
            <Text style={styles.text}>Step 3: Enter your name</Text>
            <RegisterName />
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
