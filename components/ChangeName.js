import React, { useContext } from "react";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import * as Yup from "yup";
import axios from "axios";
import { apiConfig } from "../config/config";
import PropTypes from "prop-types";

import PopupForm from "../components/PopupForm";

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required().label("Name"),
});

const ChangeName = (props) => {
  const authContext = useContext(AuthContext);

  const handleSubmit = (values) => {
    axios
      .patch(
        apiConfig.baseUrl + "users/" + authContext.user.id + "/",
        {
          first_name: values["name"],
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
      {label: 'Name', fieldName: 'name', placeholder: 'New name'},
  ]


  return (
    <PopupForm fields={fields} initialValues={{name: authContext.user.first_name}} submitButtonText="Save"
               submitHandler={handleSubmit} validationSchema={validationSchema} />
  );
};

ChangeName.propTypes = {
  hidemodal: PropTypes.func,
};

export default ChangeName;
