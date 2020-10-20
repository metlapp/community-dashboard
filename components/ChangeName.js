import React from "react";
import { Button, Title, TextInput } from "react-native-paper";

const ChangeName = (props) => {
  var newName = "";
  const [error, setError] = React.useState(false);
  const saveAndClose = () => {
    if (newName == "") {
      setError(true);
    } else {
      setError(false);
      props.setUser({ name: newName });
      props.hidemodal();
    }
  };

  return (
    <>
      <Title>Hello, {props.user.name}</Title>
      <TextInput
        className="newNameInput"
        placeholder="Change Name"
        onChangeText={(text) => (newName = text)}
        error={error}
      />
      <Button className="save" onPress={saveAndClose}>
        Save
      </Button>
    </>
  );
};

export default ChangeName;
