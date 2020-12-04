import React from "react";
import {Title} from "react-native-paper";
import PropTypes from "prop-types";
import defaultStyles from "../config/defaultStyles";
import AppFormField from "./AppFormField";
import Form from "./Form";
import SubmitButton from "./SubmitButton";

export default function PopupForm({fields, submitButtonText, initialValues, submitHandler, validationSchema}) {

    const formFields = fields.map((field) =>
        <React.Fragment key={field.label}>
            <Title style={defaultStyles.formFieldTitle}>{field.label}</Title>
            <AppFormField id={field.fieldName} placeholder={field.placeholder} name={field.fieldName}
                          secureTextEntry={field.secure}/>
        </React.Fragment>
    );

    return (
        <>
            <Form
                initialValues={initialValues}
                onSubmit={submitHandler}
                validationSchema={validationSchema}
                key={JSON.stringify(fields)}  // need unique key for react
            >
                {formFields}

                <SubmitButton className="submit" title={submitButtonText}/>
            </Form>
        </>
    );
};

PopupForm.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            fieldName: PropTypes.string,
            placeholder: PropTypes.string,
            secure: PropTypes.bool,
        })
    ),
    submitButtonText: PropTypes.string,
    initialValues: PropTypes.object,
    submitHandler: PropTypes.func,
    validationSchema: PropTypes.object,
};

