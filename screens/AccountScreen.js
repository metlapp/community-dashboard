import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  Button,
  Appbar,
  Modal,
  Portal,
  Card,
  Title,
  TextInput,
} from "react-native-paper";

const user = [{ name: "Dawson", email: "", password: "" }];

const NameCh = (props) => {
  var newName = "";
  const [error, setError] = React.useState(false);
  const saveAndClose = () => {
    if (newName == "") {
      setError(true);
    } else {
      setError(false);
      user[0].name = newName;
      props.hidemodal();
    }
  };
  return (
    <>
      <Title>Hello, {user[0].name}</Title>
      <TextInput
        label="Change Name"
        onChangeText={(text) => (newName = text)}
        error={error}
      />
      <Button onPress={saveAndClose}>Save</Button>
    </>
  );
};
const EmailCh = () => {
  console.log("in Email");
  return (
    <>
      <Title>Email</Title>
    </>
  );
};
const PasswordCh = () => {
  return (
    <>
      <Title>Password</Title>
    </>
  );
};

const OpenModal = (props) => {
  return (
    <Portal>
      <Modal visible={props.visibility} onDismiss={props.hidemodal}>
        <Card>
          <Card.Content>
            {(() => {
              switch (props.state) {
                case "Email":
                  return <EmailCh />;
                case "Name":
                  return <NameCh hidemodal={props.hidemodal} />;
                case "Password":
                  return <PasswordCh />;
              }
            })()}
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

const AccountScreen = () => {
  const [state, setState] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Content title="ACCOUNT" />
      </Appbar.Header>
      <OpenModal visibility={visible} hidemodal={hideModal} state={state} />
      <View style={styles.buttonContainer}>
        <Button
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
          className="changeNameButton"
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
