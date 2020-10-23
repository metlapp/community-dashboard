import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import { FormContext } from "../auth/Context";
import RegisterEmail from "./RegisterEmail";
import RegisterName from "./RegisterName";
import RegisterPassword from "./RegisterPassword";

export default function RegistrationScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const authContext = useContext(AuthContext);

  const setUser = (user) => {
    authContext.setUser(user);
    authStorage.storeUser(user);
  };

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
            <Text testID="title" style={styles.text}>
              Registration Page
            </Text>
            <Text testID="emailTitle" style={styles.text}>
              Step 1: Enter your email
            </Text>
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
            <RegisterName name={formData.name} navigation={navigation} />
          </>
        ) : (
          <>
            {console.log(formData)}
            {setUser(formData)}
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
