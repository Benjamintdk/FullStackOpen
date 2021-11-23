import React from 'react';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
});

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5
    }
});

const SignInForm = ({ onSubmit }) => {

    return (
    <View>
        <FormikTextInput name="username" placeholder="username" />
        <FormikTextInput name="password" placeholder="password" secureTextEntry={true}/>
        <Pressable onPress={onSubmit} style={styles.button}>
            <Text 
                fontSize='heading' 
                color='white' 
                backgroundColor='primary'>
                    Sign in 
            </Text>
        </Pressable>
    </View>
    );
};

const SignIn = () => {
    const onSubmit = values => {
        console.log(values);
    };

    return (
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
                {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;