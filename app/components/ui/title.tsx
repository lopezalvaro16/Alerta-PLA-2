import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function Title({content}: {content: string}) {
  return <Text style={styles.title}>{content}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: parseFloat('30vw'),
    fontWeight: 'bold',
    marginBottom: '4%',
  },
});
