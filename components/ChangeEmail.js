import React, { useContext } from "react";
import { Title } from "react-native-paper";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import Form from "../components/Form";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import * as Yup from "yup";
import axios from "axios";
import { apiConfig } from "../config/config";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

const ChangeEmail = (props) => {
  const authContext = useContext(AuthContext);

  const handleSubmit = (values) => {
    axios
      .patch(
        apiConfig.baseUrl + "users/" + authContext.user.id + "/",
        {
          email: values["email"],
        },
        {
          auth: apiConfig.auth,
        }
      )
      .then(() => {
        authContext.setUser({ ...authContext.user, email: values["email"] });
        authStorage.storeUser(authContext.user);
      })
      .catch(console.error);
    props.hidemodal();
  };

  return (
    <>
      <Title>Current Email : {authContext.user.email}</Title>
      <Form
        initialValues={{
          email: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField id="email" placeholder="New Email" name="email" />
        <SubmitButton className="submit" title="Change Email" />
      </Form>
    </>
  );
};

export default ChangeEmail;
