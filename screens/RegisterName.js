import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import PropTypes from "prop-types";
import SubmitButton from "../components/SubmitButton";
import AppFormField from "../components/AppFormField";
import Form from "../components/Form";
import AppButton from "../components/AppButton";
import { FormContext } from "../auth/Context";
import defaultStyles from "../config/defaultStyles";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
});

export default function RegisterName({ name }) {
  const { formData, setFormData, step, setStep } = useContext(FormContext);

  return (
    <View style={styles.container}>
      <Form
        initialValues={{ name }}
        onSubmit={(values) => {
          setFormData(() => ({
            ...formData,
            name: values.name,
          }));
        }}
        validationSchema={validationSchema}
      >
        <AppFormField
          testID="input"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Enter your name"
          name="name"
          style={defaultStyles.TextInput}
          width="100%"
        />
        <View>
          <SubmitButton title="Save" />
          <AppButton title="Back" onPress={() => setStep(step - 1)} />
        </View>
      </Form>
    </View>
  );
}

RegisterName.propTypes = {
  name: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  TextInput: {
    lineHeight: 25,
    fontSize: 20,
    paddingLeft: 10,
  },
});
