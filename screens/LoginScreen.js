import React, { useContext, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Button, Title, Appbar } from "react-native-paper";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import Form from "../components/Form";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import * as Yup from "yup";
import axios from "axios";
import { apiConfig } from "../config/config";
import ErroMessage from "../components/ErrorMessage";
// need for testing on device
import { HOST_WITH_PORT } from "../environment";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

export default function LoginScreen({ navigation }) {
  //Grabs user data from the context. witht this you can use setUser and user
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(false);

  const handleSubmit = async (values) => {
    axios
      .post(
        // temporary for testing on device
        `${HOST_WITH_PORT}login/`,
        // apiConfig.baseUrl + "login/",
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
      .catch(() => {
        setError(true);
      });
  };
  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Content testID="heading" title="LOGIN" />
      </Appbar.Header>
      <View style={styles.container}>
        <Form
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField id="email" placeholder="Email" name="email" />
          <AppFormField
            id="paswword"
            placeholder="Password"
            name="password"
            secureTextEntry
          />
          <SubmitButton className="submit" title="Login" />
        </Form>
        <ErroMessage
          error="Invalid Email password combination"
          visible={error}
          styling={styles.error}
        />
        <Button
          style={styles.forgotButton}
          color="blue"
          onPress={() => {
            navigation.navigate("VerifyEmail");
          }}
        >
          Forgot Password
        </Button>

        <View>
          <Title style={styles.registerContainer}>Don't have an account?</Title>
          <Button
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            Register
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  container: {
    height: "90%",
    justifyContent: "center",
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

  forgotButton: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  registerContainer: {
    justifyContent: "center",
    textAlign: "center",
  },
});
