import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import axios from "axios";
import { apiConfig } from "../config/config";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import { FormContext } from "../auth/Context";
import RegisterEmail from "./RegisterEmail";
import RegisterName from "./RegisterName";
import RegisterPassword from "./RegisterPassword";
import PropTypes from "prop-types";

export default function RegistrationScreen(props) {
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [step, setStep] = useState(1);

  const saveUser = async (user) => {
    axios
      .post(
        apiConfig.baseUrl + "users/",
        {
          email: user.email,
          first_name: user.name,
          password: user.password,
          categories: [],
          organization: null,
        },
        {
          auth: apiConfig.auth,
        }
      )
      .then((data) => {
        authContext.setUser(data.data);
        authStorage.storeUser(data.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (formData.name || props.test) {
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
            <RegisterEmail
              email={formData.email}
              navigation={props.navigation}
            />
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
            <RegisterName name={formData.name} navigation={props.navigation} />
          </>
        )}
      </SafeAreaView>
    </FormContext.Provider>
  );
}

RegistrationScreen.propTypes = {
  test: PropTypes.bool,
  navigation: PropTypes.object,
};

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
