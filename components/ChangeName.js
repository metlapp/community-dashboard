import React from "react";
import { Button, Title, TextInput } from "react-native-paper";

const user = [{ name: "Dawson", email: "", password: "" }];

const ChangeName = (props) => {
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
        className="newNameInput"
        label="Change Name"
        onChangeText={(text) => (newName = text)}
        error={error}
      />
      <Button onPress={saveAndClose}>Save</Button>
    </>
  );
};

export default ChangeName;
