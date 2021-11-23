import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: '#d73a4a'
  },
  inputError: {
    borderColor: '#d73a4a'
  },
  field: {
      paddingTop: 5,
      paddingBottom: 5,
      borderWidth: 1,
      backgroundColor: '#D3D3D3'
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  const inputStyles = [
    styles.field,
    showError && styles.inputError
  ];

  return (
    <>
      <TextInput
        style={inputStyles}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;