import React, { useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { TextInput, Button, Title, Appbar } from "react-native-paper";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";

export default function LoginScreen() {
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
        <TextInput
          label="Email"
          error={true}
          onChangeText={(text) => (user.email = text)}
        />
        <TextInput
          secureTextEntry={true}
          label="Password"
          onChangeText={(text) => (user.password = text)}
        />
        <View>
          <Button mode="contained" style={styles.button} onPress={handleSubmit}>
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
