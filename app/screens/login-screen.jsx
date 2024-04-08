import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFirebase} from '../context/firebase-context';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {logInUser} = useFirebase();

  const handleLogin = async () => {
    if (email.trim() === '' || password === '') {
      Alert.alert(
        'Error',
        'Por favor ingresa tu correo electrónico y contraseña.',
      );
      return;
    }

    try {
      await logInUser(email, password);
      navigation.navigate('Splash');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Usuario o contraseña incorrecta');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>¡Bienvenido de nuevo!</Text>
        <Text style={styles.subTitle}>Inicia sesión para continuar</Text>
      </View>
      <View style={styles.formBox}>
        <Text style={styles.text}>Email</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#ccc"
            placeholder="ejemplo@gmail.com"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
          />
        </View>
        <Text style={styles.text}>Contraseña</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="*************"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <View style={styles.registerLink}>
          <Text style={styles.registerText}>¿Olvidaste tu contraseña?</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerButton}>Click aqui</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}> © 2023 Alerta PLA.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#21233d',
    alignItems: 'center',
  },
  containerTitle: {
    width: '80%',
    marginTop: height * 0.09,
  },
  title: {
    color: 'white',
    fontSize: width * 0.08,
  },
  subTitle: {
    color: 'white',
    fontSize: width * 0.05,
  },
  text: {
    color: 'white',
    fontSize: width * 0.04,
  },
  formBox: {
    width: '80%',
    marginTop: height * 0.05,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: height * 0.03,
  },
  input: {
    flex: 1,
    padding: width * 0.02,
    color: 'white',
  },
  button: {
    backgroundColor: '#725599',
    padding: width * 0.04,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: height * 0.04,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  registerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: height * 0.01,
  },
  registerText: {
    marginRight: width * 0.01,
    color: '#ccc',
    marginTop: height * 0.05,
  },
  registerButton: {
    color: '#725599',
    fontWeight: 'bold',
    marginTop: height * 0.05,
  },
  footer: {
    marginTop: 'auto',
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  footerText: {
    fontSize: width * 0.03,
    color: '#ccc',
  },
});

export default LoginScreen;
