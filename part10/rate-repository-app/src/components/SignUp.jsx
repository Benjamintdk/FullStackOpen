import React from 'react';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';

const initialValues = {
    username: '',
    password: '',
    confirmPassword: ''
};

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(1, 'Minimum length of 1 required')
      .max(30, 'Maximum length of 30 allowed')
      .required('Username is required'),
    password: yup
      .string()
      .min(5, 'Minimum length of 5 required')
      .max(50, 'Maximum length of 50 required')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null])
      .required('Confirm password is required')
});

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5
    }
});

const SignUpForm = ({ onSubmit }) => {

    return (
    <View>
        <FormikTextInput 
            testID='username' 
            name="username" 
            placeholder="username" 
        />
        <FormikTextInput 
            testID='password' 
            name="password" 
            placeholder="password" 
            secureTextEntry={true}
        />
        <FormikTextInput 
            testID='confirm-password' 
            name="confirmPassword" 
            placeholder="confirm password" 
            secureTextEntry={true}
        />
        <Pressable testID='sign-up' onPress={onSubmit} style={styles.button}>
            <Text 
                fontSize='heading' 
                color='white' 
                backgroundColor='primary'>
                    Sign Up
            </Text>
        </Pressable>
    </View>
    );
};

export const SignUpContainer = ({ initialValues, validationSchema, onSubmit }) => {
    return (
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
                {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const SignUp = () => {
    const history = useHistory();
    const [signIn] = useSignIn();
    const [addUser] = useSignUp();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const response = await addUser({ username, password });
            if (response) {
                try {
                    await signIn({ username, password });
                    history.push('/');
                } catch (e) {
                    console.log(e);
                }
            }
        } catch (e) {
          console.log(e);
        }
    };

    return (
        <SignUpContainer 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        />
    );

};

export default SignUp;