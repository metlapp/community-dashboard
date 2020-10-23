import React, { useContext } from "react";
import { Title } from "react-native-paper";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import Form from "../components/Form";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

const ChangeEmail = (props) => {
  const authContext = useContext(AuthContext);

  const handleSubmit = (values) => {
    let user = {
      name: authContext.user.name,
      email: values["email"],
      password: authContext.user.password,
    };
    authContext.setUser(user);
    authStorage.storeUser(user);
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
