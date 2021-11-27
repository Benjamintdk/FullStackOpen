import React from "react";
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { View, Pressable, StyleSheet } from 'react-native';
import { useHistory } from "react-router";
import useCreateReview from "../hooks/useCreateReview";
import Text from "./Text";

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: null,
    text: ''
};

const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required('Username is required'),
    repositoryName: yup
      .string()
      .required('Password is required'),
    rating: yup
      .number()
      .required('Rating required')
      .min(0, 'Must be at least 0')
      .max(100, 'Must be at most 100'),
    text: yup
      .string()
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
        <FormikTextInput testID='owner-username' name="ownerName" placeholder="repository owner name" />
        <FormikTextInput testID='repo-name' name="repositoryName" placeholder="repository name" />
        <FormikTextInput testID='rating' name="rating" placeholder="rating between 0 and 100" />
        <FormikTextInput testID='review' name="text" placeholder="review" />
        <Pressable testID='create-review' onPress={onSubmit} style={styles.button}>
            <Text 
                fontSize='heading' 
                color='white' 
                backgroundColor='primary'>
                    Create a Review
            </Text>
        </Pressable>
    </View>
    );
};

export const CreateReviewContainer = ({ initialValues, validationSchema, onSubmit }) => {

    return (
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
                {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );

};

const CreateReview = () => {

    const history = useHistory();
    const [addReview] = useCreateReview();

    const onSubmit = async (values) => {
        const { repositoryName, ownerName, rating, text } = values;

        try {
          const response = await addReview({ repositoryName, ownerName, rating, text });
          const id = response.data.createReview.repositoryId;
          if (id) {
            history.push(`/${id}`);
          }
        } catch (e) {
          console.log(e);
        }
    };

    return (
        <CreateReviewContainer 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        />
    );
};

export default CreateReview;