import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Appbar } from "react-native-paper";
import AuthContext from "../auth/Context";
import AccountModal from "../components/AccountModal";
import authStorage from "../auth/Storage";

const AccountScreen = () => {
  //determines what component the modal will render when a button is clicked

  const [form, setForm] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const authContext = useContext(AuthContext);

  console.log(authContext.user);

  const handleLogout = () => {
    //Both sets the user to null and removes the user from async storage
    authContext.setUser(null);
    authStorage.removeUser();
  };
  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Content title="ACCOUNT" />
      </Appbar.Header>
      {/* Opens model and takes in the visible state with what component to render */}
      <AccountModal visibility={visible} hidemodal={hideModal} form={form} />
      <View style={styles.buttonContainer}>
        {/* When Button is clicked it changes the state of the visibility and
           tells the modal what component to render inside the modal */}
        <Button
          className="button"
          style={styles.buttonStyle}
          icon="email"
          mode="contained"
          onPress={() => {
            setForm("Email");
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
            setForm("Name");
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
            setForm("Password");
            showModal();
          }}
        >
          Change password
        </Button>
        <Button
          className="button"
          style={styles.buttonStyle}
          icon="square-edit-outline"
          mode="contained"
          onPress={handleLogout}
        >
          Log Out
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
