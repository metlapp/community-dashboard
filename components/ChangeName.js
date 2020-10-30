import React, { useContext, useEffect } from "react";
import { Button, Title, TextInput } from "react-native-paper";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import axios from "axios";
import { apiConfig } from "../config/config";

const ChangeName = (props) => {
  const authContext = useContext(AuthContext);
  var newName = "";
  const [error, setError] = React.useState(false);

  const postName = async () => {
    newName = newName.trim();
    axios
      .patch(apiConfig.baseUrl + "users/"+authContext.user.id, {
        auth: {
          username: 'admin@admin.com',
          password: 'admin'
        },
        first_name: newName
      })
      .then(() =>{
        authContext.setUser({ ...authContext.user, name: newName });
        authStorage.storeUser(authContext.user);
      }
      )
      .catch(console.error);
  };

 

  const saveAndClose = () => {
    if (newName == "") {
      setError(true);
    } else {
      postName();
      setError(false);
     
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
