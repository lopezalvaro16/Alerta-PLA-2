import {StyleSheet, TextInput} from 'react-native';
import React from 'react';

const InputText = ({placeholder, value, onChangeTextCallback}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      multiline
      numberOfLines={4}
      onChangeText={text => onChangeTextCallback(text)}
    />
  );
};

export default InputText;

const styles = StyleSheet.create({
  input: {
    height: parseFloat('60vh'),
    borderColor: 'gray',
    borderWidth: 1.5,
    marginBottom: '4%',
    padding: '2%',
  },
});
