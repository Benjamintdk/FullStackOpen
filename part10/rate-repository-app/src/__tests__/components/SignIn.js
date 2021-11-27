import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';
import * as yup from 'yup';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
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

      const onSubmit = jest.fn();

      const { getByTestId } = render(
        <SignInContainer 
            initialValues={initialValues}
            onSubmit={onSubmit} 
            validationSchema={validationSchema}
        />
      );

      fireEvent.changeText(getByTestId('username'), 'kalle');
      fireEvent.changeText(getByTestId('password'), 'password');
      fireEvent.press(getByTestId('sign-in'));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'kalle',
            password: 'password',
        });
      });
    });
  });
});