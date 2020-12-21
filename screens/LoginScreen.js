import React, {useContext, useState} from "react";
import {StyleSheet, ScrollView, View, SafeAreaView, Image} from "react-native";
import {Title, Text} from "react-native-paper";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import Form from "../components/Form";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import * as Yup from "yup";
import axios from "axios";
import {apiConfig} from "../config/config";
import ErroMessage from "../components/ErrorMessage";
import defaultStyles, {linkColor, subtleLinkColor} from "../config/defaultStyles";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

export default function LoginScreen({navigation}) {
  //Grabs user data from the context. witht this you can use setUser and user
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(false);

  const handleSubmit = async (values) => {
    axios
      .post(
        apiConfig.baseUrl + "login/",
        {
          email: values["email"],
          password: values["password"],
        },
        {
          auth: apiConfig.auth,
        }
      )
      .then((data) => {
        setError(false);
        authContext.setUser(data.data);
        authStorage.storeUser(data.data);
      })
      .catch((err) => {
        console.log(err.response);
        setError(true);
      });
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{...defaultStyles.mainContainer, ...styles.container}}>
          <Image
            style={styles.logo}
            source={require('../assets/logo.png')}
          />
          <View style={defaultStyles.formContainer}>
            <Form
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <Title style={defaultStyles.formFieldTitle}>Email</Title>
              <AppFormField
                id="email"
                placeholder="Email"
                placeholderTextColor="transparent"  // note - placeholder on email and password important for autofill
                name="email"
                textContentType="username"
              />
              <Title style={defaultStyles.formFieldTitle}>Password</Title>
              <AppFormField
                textContentType="password"
                id="password"
                placeholder="Password"
                placeholderTextColor="transparent"
                name="password"
                secureTextEntry
              />
              <SubmitButton className="submit" title="Sign In"/>
            </Form>
          </View>
          <ErroMessage
            error="Invalid Email password combination"
            visible={error}
            styling={styles.error}
          />
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text
                style={styles.forgotLink}
                onPress={() => {
                  navigation.navigate("VerifyEmail");
                }}
              >
                Forgot Password?
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={styles.registerLink}
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                Sign Up
              </Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "70%",
    resizeMode: 'contain',
  },
  container: {
    marginTop: '30%',
  },
  error: {
    alignItems: "center",
    backgroundColor: "red",
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    justifyContent: "center",
    textAlign: "center",
  },

  forgotLink: {
    color: subtleLinkColor,
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerLink: {
    textAlign: 'right',
    color: linkColor,
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',

  },
});
