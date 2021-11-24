import React from 'react';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import useSignIn from '../hooks/useSignIn';
import * as yup from 'yup';
import { useHistory } from 'react-router';

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

    const [signIn] = useSignIn();
    const history = useHistory();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
          const response = await signIn({ username, password });
          if (response) {
            history.push('/');
          }
        } catch (e) {
          console.log(e);
        }
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