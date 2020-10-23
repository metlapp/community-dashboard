import React, { useContext } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Button, Title, Appbar } from "react-native-paper";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import Form from "../components/Form";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

export default function LoginScreen() {
  //Grabs user data from the context. witht this you can use setUser and user
  const authContext = useContext(AuthContext);

  let user = { name: "Jaycob", email: "", password: "" };

  const handleSubmit = () => {
    //Here we need to check API if valid
    authContext.setUser(user);
    authStorage.storeUser(user);
  };
  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Content title="LOGIN" />
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
        <Button
          style={styles.forgotButton}
          color="blue"
          onPress={() => {
            console.log("Press");
          }}
        >
          Forgot Password
        </Button>
        <View>
          <Title style={styles.registerContainer}>Don't have an account?</Title>

          <Button>Register</Button>
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
