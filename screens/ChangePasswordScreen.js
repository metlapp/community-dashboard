import React from 'react'
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import Form from '../components/Form'
import SubmitButton from '../components/SubmitButton'

const validationSchema = {
    
}

export default function ChangePasswordScreen() {
    return (
        <SafeAreaView style={styles.container} >
            <Form style={styles.form} initialValues={{ currentPassword: "", newPassword: "", confirmNewPassword: "" }} onSubmit={(values) => console.log(values)} validationSchema={validationSchema} >
                <TextInput autoFocus secureTextEntry placeholder="Current Password" name="currentPassword" style={styles.TextInput} />
                <TextInput autoFocus secureTextEntry placeholder="New Password" name="newPassword" style={styles.TextInput} />
                <TextInput autoFocus secureTextEntry placeholder="New Password" name="confirmNewPassword" style={styles.TextInput} />
                <SubmitButton title="Save" />
            </Form>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",

    },
    form: {
        width: "70%"
    },
    TextInput: {
        lineHeight: 25,
        marginVertical: 5
    }
})
