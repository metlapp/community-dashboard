import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Appbar } from "react-native-paper";
import AccountModal from "../components/AccountModal";

const AccountScreen = (props) => {
  //determines what component the modal will render when a button is clicked
  const [state, setState] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Content title="ACCOUNT" />
      </Appbar.Header>
      {/* Opens model and takes in the visible state with what component to render */}
      <AccountModal
        visibility={visible}
        hidemodal={hideModal}
        state={state}
        {...props}
      />
      <View style={styles.buttonContainer}>
        {/* When Button is clicked it changes the state of the visibility and
           tells the modal what component to render inside the modal */}
        <Button
          className="button"
          style={styles.buttonStyle}
          icon="email"
          mode="contained"
          onPress={() => {
            setState("Email");
            setVisible(true);
          }}
        >
          Change Email address
        </Button>
        <Button
          className="button"
          style={styles.buttonStyle}
          icon="account-edit"
          mode="contained"
          onPress={() => {
            setState("Name");
            showModal();
          }}
        >
          Change name
        </Button>
        <Button
          className="button"
          style={styles.buttonStyle}
          icon="square-edit-outline"
          mode="contained"
          onPress={() => {
            setState("Password");
            showModal();
          }}
        >
          Change password
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    margin: 10,
    width: "100%",
    height: 60,
    justifyContent: "center",
  },
});

export default AccountScreen;
