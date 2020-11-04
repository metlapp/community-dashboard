import React, { useContext, useEffect } from "react";
import { Button, Title, TextInput } from "react-native-paper";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import axios from "axios";
import { apiConfig } from "../config/config";
import PropTypes from "prop-types";

const ChangeName = (props) => {
  const authContext = useContext(AuthContext);
  var newName = "";
  const [error, setError] = React.useState(false);

  // Posts new name to the API
  const postName = async () => {
    axios
      .patch(
        apiConfig.baseUrl + "users/" + authContext.user.id + "/",
        { first_name: newName },
        {
          auth: apiConfig.auth,
        }
      )
      .then((data) => {
        authContext.setUser(data.data);
        authStorage.storeUser(data.data);
      })
      .catch(console.error);
  };

  const saveAndClose = () => {
    newName = newName.trim();
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
      <Title>Hello, {authContext.user.first_name}</Title>
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

ChangeName.propTypes = {
  hidemodal: PropTypes.func,
};

export default ChangeName;
