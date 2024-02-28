import {StyleSheet, Text} from 'react-native';
import React from 'react';

const IntroText = ({content}: {content: string}) => {
  return <Text style={styles.introText}>{content}</Text>;
};

export default IntroText;

const styles = StyleSheet.create({
  introText: {
    fontSize: parseFloat('20vw'),
    marginBottom: '7%',
    textAlign: 'justify',
  },
});
