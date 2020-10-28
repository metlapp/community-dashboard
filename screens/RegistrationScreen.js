import React, { useContext, useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import { FormContext } from "../auth/Context";
import RegisterEmail from "./RegisterEmail";
import RegisterName from "./RegisterName";
import RegisterPassword from "./RegisterPassword";

export default function RegistrationScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [step, setStep] = useState(1);

  const saveUser = (user) => {
    authContext.setUser(user);
    authStorage.storeUser(user);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    if (formData.name) {
      saveUser(formData);
    }
  }, [formData]);
  return (
    <FormContext.Provider value={{ formData, setFormData, step, setStep }}>
      <SafeAreaView style={styles.container}>
        {/* Conditionally rendering each step of the from */}
        {step === 1 ? (
          <>
            <Text style={styles.text}>Registration Page</Text>
            <Text testID="emailTitle" style={styles.text}>
              Step 1: Enter your email
            </Text>
            <RegisterEmail email={formData.email} navigation={navigation} />
          </>
        ) : step === 2 ? (
          <>
            <Text style={styles.text}>Registration Page</Text>
            <Text style={styles.text}>Step 2: Enter your password</Text>
            <RegisterPassword />
          </>
        ) : (
          <>
            <Text style={styles.text}>Registration Page</Text>
            <Text style={styles.text}>Step 3: Enter your name</Text>
            <RegisterName name={formData.name} navigation={navigation} />
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
