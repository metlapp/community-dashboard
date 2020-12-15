import React, {useState} from "react";
import axios from "axios";
import {SafeAreaView, View} from "react-native";
import {Title} from "react-native-paper";

import * as Yup from "yup";
import AppFormField from "../components/AppFormField";
import ErrorMessage from "../components/ErrorMessage";
import Form from "../components/Form";
import SubmitButton from "../components/SubmitButton";
import SuccessMessage from "../components/SuccessMessage";
import PropTypes from "prop-types";

import {apiConfig} from "../config/config";
import defaultStyles from "../config/defaultStyles";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

export default function VerifyEmailScreen({navigation}) {
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const sendEmail = async (obj) => {
    await axios.post(apiConfig.baseUrl + 'api/password_reset/', {email: obj['email']}).then(() => {
      try {
        setErrorVisible(false);
        setSuccessVisible(true);
      } catch (error) {
        setErrorVisible(true);
      }
    });
  };

  return (
    <SafeAreaView>
      <View style={defaultStyles.mainContainer}>

        <View style={defaultStyles.formContainer}>
          <Form
            initialValues={{email: ""}}
            onSubmit={(values) => {
              sendEmail(values);
              values["email"] = "";
            }}
            validationSchema={validationSchema}
          >
            <Title style={defaultStyles.formFieldTitle}>Email</Title>
            <AppFormField
              name="email"
              placeholder="Your email address"
              testID="email"
              keyboardType="email-address"
            />

            <SubmitButton title="Continue"/>

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
              messageStyles={{height: 100, fontWeight: "600", padding: 10}}
            />

          </Form>
        </View>
      </View>
    </SafeAreaView>
  );
}

VerifyEmailScreen.propTypes = {
  navigation: PropTypes.object,
};

