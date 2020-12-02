import React, { useEffect, useState, useContext } from "react";
import * as Yup from "yup";
import axios from "axios";
import { apiConfig } from "../config/config";
import AuthContext from "../auth/Context";
import PropTypes from "prop-types";

import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import PopupForm from "../components/PopupForm";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().trim().required().label("Current Password"),
  newPassword: Yup.string().trim().required().min(8).label("New Password"),
  confirmNewPassword: Yup.string().trim().required().min(8).label("Confirm Password"),
});

export default function ChangePassword(props) {
  const authContext = useContext(AuthContext);
  // Temporary user data

  const [errorVisible, setErrorVisible] = useState(false);
  const [error, setError] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  // Reset errors upon page render
  useEffect(() => {
    setSuccessVisible(false);
    setErrorVisible(false);
  }, []);

  // reset form to initial values
  const resetForm = (values) => {
    values["newPassword"] = "";
    values["currentPassword"] = "";
    values["confirmNewPassword"] = "";
  };

  const handleSubmit = async (values) => {
    setErrorVisible(false);
    // Show error if new passwords do not match
    if (values["newPassword"] !== values["confirmNewPassword"]) {
      setError("Please make sure new passwords match!");
      setErrorVisible(true);
      return;
    }
    values["newPassword"] === values["confirmNewPassword"];
    // If no error, submit password change
    const currentPassword = values["currentPassword"];
    const newPassword = values["newPassword"];

    axios
      .patch(
        apiConfig.baseUrl + "users/" + authContext.user.id + "/",
        { password: newPassword, current_password: currentPassword },
        {
          auth: apiConfig.auth,
        }
      )
      .then(() => {
        setSuccessVisible(true);
        setErrorVisible(false);
        resetForm(values);
        setTimeout(() => {
          setSuccessVisible(false);
          props.hidemodal();
        }, 5000);
      })
      .catch((error) => {
        setError(error.response.data.password[0]);
        setErrorVisible(true);
        return;
      });
  };
  const fields = [
      {label: 'Current Password', fieldName: 'currentPassword', placeholder: 'Current password', secure: true,},
      {label: 'New Password', fieldName: 'newPassword', placeholder: 'New password', secure: true,},
      {label: '', fieldName: 'confirmNewPassword', placeholder: 'Confirm new password', secure: true,},
  ]


  return (
      <>
          <PopupForm fields={fields} initialValues={{currentPassword: "", newPassword: "", confirmNewPassword: ""}}
                     submitButtonText="Change Password" submitHandler={handleSubmit}
                     validationSchema={validationSchema} />
          <SuccessMessage
              success="Password changed successfully"
              visible={successVisible}
          />
          <ErrorMessage
              error={error}
              visible={errorVisible}
              className="errorMessage"
          />
      </>
  );
}
ChangePassword.propTypes = {
  hidemodal: PropTypes.func,
};

