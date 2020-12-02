import React, { useContext } from "react";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import * as Yup from "yup";
import axios from "axios";
import { apiConfig } from "../config/config";
import PropTypes from "prop-types";

import PopupForm from "../components/PopupForm";

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
      .then((data) => {
        authContext.setUser(data.data);
        authStorage.storeUser(data.data);
      })
      .catch(console.error);
    props.hidemodal();
  };

    const fields = [
        {label: 'Email', fieldName: 'email', placeholder: 'New email address'},
    ]


  return (
    <PopupForm fields={fields} initialValues={{email: authContext.user.email}} submitButtonText="Save"
               submitHandler={handleSubmit} validationSchema={validationSchema} />
  );
};

ChangeEmail.propTypes = {
  hidemodal: PropTypes.func,
};

export default ChangeEmail;
