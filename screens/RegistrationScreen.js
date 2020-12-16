import React, {useContext, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Title, Checkbox} from "react-native-paper";
import axios from "axios";
import {apiConfig} from "../config/config";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import PropTypes from "prop-types";
import * as Yup from "yup";

import Form from "../components/Form";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import defaultStyles, {linkColor, mediumGrey} from "../config/defaultStyles";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().trim().required().min(8).label("New Password"),
  confirmPassword: Yup.string().trim().oneOf([Yup.ref('password'), null]).required().min(8).label("Confirm Password"),
});

export default function RegistrationScreen({navigation}) {
  const authContext = useContext(AuthContext);
  const [checked, setChecked] = useState(false);

  const saveUser = async (user) => {
    axios
      .post(
        apiConfig.baseUrl + "users/",
        {
          email: user.email,
          first_name: user.email,
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
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={defaultStyles.mainContainer}>

          <Title style={styles.pageTitle}>Sign Up</Title>

          <View style={defaultStyles.formContainer}>
            <Form
              initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={(values) => {
                saveUser(values);
              }}
              validationSchema={validationSchema}
            >
              <Title style={defaultStyles.formFieldTitle}>Email</Title>
              <AppFormField
                testID="emailInput"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Email address"
                name="email"
              />
              <Title style={defaultStyles.formFieldTitle}>Password</Title>
              <AppFormField
                name="password"
                placeholder="Password"
                secureTextEntry
                testID="pass"
              />
              <AppFormField
                name="confirmPassword"
                placeholder="Repeat password"
                secureTextEntry
                testID="confirmPass"
              />

              <View style={{flexDirection: 'row'}}>
                {/* Checkbox does not work with Formik, so we use the value of the checkbox as an extra validation
                    parameter to the Submit button. */}
                <View style={{display: 'flex', marginLeft: -10,}}>
                  <Checkbox
                    testID="termsCheckbox"
                    status={checked ? 'checked' : 'unchecked'} onPress={() => {
                    setChecked(!checked)
                  }}/>
                </View>

                <Text style={{flex: 1, display: 'flex',}}>
                  I agree to the
                  &nbsp;
                  <Text
                    style={styles.termsLink}
                    onPress={() => {
                      navigation.navigate("TermsOfService");
                    }}
                  >
                    Terms of Service
                  </Text>
                  &nbsp;and&nbsp;
                  <Text
                    style={styles.termsLink}
                    onPress={() => {
                      navigation.navigate("PrivacyPolicy");
                    }}
                  >
                    Privacy Policy
                  </Text>
                </Text>
              </View>

              <SubmitButton className="submit" title="Register" extraIsValid={checked}/>

            </Form>

          </View>
          <Text style={styles.signInText}>
            Have an account?
            &nbsp;
            <Text
              style={styles.signInLink}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

RegistrationScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 26,
    marginTop: 100,
    textAlign: 'left',
    width: '100%',
  },
  termsLink: {
    color: linkColor,
  },
  signInText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: mediumGrey,
    marginHorizontal: 'auto',
  },
  signInLink: {
    color: linkColor,
  },
});
