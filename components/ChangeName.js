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

  const fetchData = async () => {
    axios
      .get(apiConfig.baseUrl + "/user/5tVxgsqPCjv2Ul5Rc7gw", {
        headers: { "app-id": "5f9897efd637d42b2399ba35" },
      })
      .then(({ data }) => {
        authContext.setUser({ ...authContext.user, name: data.firstName }),
          console.log(data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveAndClose = () => {
    if (newName == "") {
      setError(true);
    } else {
      setError(false);
      authContext.setUser({ ...authContext.user, name: newName });
      authStorage.storeUser(authContext.user);
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
