import {StyleSheet, Text} from 'react-native';
import React from 'react';

interface Props {
  content: string;
}

const Label = ({content}: Props) => {
  return <Text style={styles.label}>{content}</Text>;
};

export default Label;

const styles = StyleSheet.create({
  label: {
    fontSize: parseFloat('30vw'),
    fontWeight: 'bold',
    marginBottom: '2%',
  },
});
