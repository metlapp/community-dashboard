import React, { useContext } from "react";
import { Button, Title, TextInput } from "react-native-paper";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";

const ChangeName = (props) => {
  const authContext = useContext(AuthContext);
  var newName = "";
  const [error, setError] = React.useState(false);
  const saveAndClose = () => {
    if (newName == "") {
      setError(true);
    } else {
      setError(false);
      let user = {
        name: newName,
        email: authContext.user.email,
        password: authContext.user.password,
      };
      authContext.setUser(user);
      authStorage.storeUser(user);
      props.hidemodal();
    }
  };

  return (
    <>
      <Title>Hello, {authContext.user.name}</Title>
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
