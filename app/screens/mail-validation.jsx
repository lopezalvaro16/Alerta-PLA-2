import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MailValidation = ({navigation}) => {
  const handleInicio = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Tus datos han sido enviados correctamente. Por favor, inicia sesion.
      </Text>
      <TouchableOpacity onPress={handleInicio} style={styles.button}>
        <Text style={styles.buttonText}>Aceptar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#21233d',
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#ccc',
  },
  button: {
    backgroundColor: '#725599',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ccc',
    fontSize: 16,
  },
});

export default MailValidation;
