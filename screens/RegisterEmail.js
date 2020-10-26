import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import AppButton from "../components/AppButton";
import AppFormField from "../components/AppFormField";
import Form from "../components/Form";
import { FormContext } from "../auth/Context";
import SubmitButton from "../components/SubmitButton";
import defaultStyles from "../config/defaultStyles";
import ErrorMessage from "../components/ErrorMessage";
import errors from "../api/errors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});
// Testing random status
const fakeApiCall = () => {
  const num = Math.floor(Math.random() * Math.floor(4));
  switch (num) {
    case 1:
      return 200;
      break;
    case 2:
      return 403;
      break;
    case 3:
      return 408;
      break;
    case 0:
      return 404;
  }
};

export default function RegisterEmail({ email, navigation }) {
  const [errorVisible, setErrorVisible] = useState(false);
  const [error, setError] = useState(false);
  const { formData, setFormData, step, setStep } = useContext(FormContext);

  const handleRegister = () => {
    let status = fakeApiCall();
    status = 200; // comment out this line to test error message
    if (status === 200) {
      setErrorVisible(false);
      return true;
    }
    console.log(status);
    setErrorVisible(true);
    if (status === 403) {
      setError(errors.errorNotFound);
    } else if (status === 408) {
      setError(errors.errorConnect);
    } else if (status === 404) {
      setError(errors.errorDefault);
    }
  };

  return (
    <Form
      initialValues={{ email }}
      onSubmit={(values) => {
        setFormData(() => ({
          ...formData,
          email: values.email,
        }));

        const status = handleRegister();
        if (status) {
          setError(false);
          setErrorVisible(false);
          setStep(step + 1);
          // navigation.navigate("Password");
        }
      }}
      validationSchema={validationSchema}
    >
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <ErrorMessage
            error={error}
            visible={errorVisible}
            styling={styles.error}
          />
        </View>
        <AppFormField
          testID="emailInput"
          onFocus={() => {
            setError(false);
          }}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Enter your email"
          name="email"
          style={defaultStyles.TextInput}
        />
        <SubmitButton title="Next" />
        <AppButton title="Back" onPress={() => navigation.navigate("Login")} />
      </View>
    </Form>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  error: {
    alignItems: "center",
    backgroundColor: "red",
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    height: "100%",
    justifyContent: "center",
    textAlign: "center",
  },
  errorContainer: {
    height: 50,
    width: "100%",
  },
});
