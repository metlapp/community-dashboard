import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, HelperText, Button, Title } from "react-native-paper";

export default function LoginScreen() {
  var email = "";
  var pass = "";

  return (
    <View style={styles.container}>
      <TextInput label="Email" onChangeText={(text) => (email = text)} />
      <TextInput
        secureTextEntry={true}
        label="Password"
        onChangeText={(text) => (pass = text)}
      />
      <View style={styles.buttonContainer}>
        <Button mode="contained" style={styles.button}>
          Submit
        </Button>

        <Button
          style={styles.forgotButton}
          color="blue"
          onPress={() => {
            console.log("Press");
          }}
        >
          Forgot Password
        </Button>
      </View>

      <View>
        <Title style={styles.registerContainer}>Don't Have an account?</Title>

        <Button>Register</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  container: {
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  buttonContainer: {
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
