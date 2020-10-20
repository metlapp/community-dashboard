import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, HelperText, Button } from "react-native-paper";

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
          style={styles.button}
          mode="contained"
          onPress={() => {
            console.log("Press");
          }}
        >
          Forgot Password
        </Button>
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
    flexDirection: "row",
    justifyContent: "center",
    width: "70%",
  },
});
