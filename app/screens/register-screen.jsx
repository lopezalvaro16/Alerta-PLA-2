import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useAuth} from '../context/auth/auth-context';

const RegisterScreen = ({navigation}) => {
  const {singUpUser, FIRESTORE_DB} = useAuth();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const nombreInputRef = useRef(null);
  const apellidoInputRef = useRef(null);
  const dniInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const repeatPasswordInputRef = useRef(null);

  const validateEmail = text => {
    setEmail(text);
    setErrors(prevErrors => ({
      ...prevErrors,
      email: text
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)
          ? ''
          : 'Por favor, ingresa un correo electrónico válido'
        : 'Por favor, ingresa tu dirección de correo electrónico',
    }));
  };

  const validateRepeatPassword = text => {
    setRepeatPassword(text);
    setErrors(prevErrors => ({
      ...prevErrors,
      repeatPassword: text === password ? '' : 'Las contraseñas no coinciden',
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    if (Object.values(errors).some(error => error !== '')) {
      console.log('Hay errores en el formulario. No se puede registrar.');
      return;
    }
    const additionalData = {
      nombre,
      apellido,
      dni,
    };
    try {
      const userCredential = await singUpUser(email, password);
      const uid = userCredential.user.uid;
      await FIRESTORE_DB.collection('users').add({
        ...additionalData,
        uid: uid,
        email: email,
      });

      navigation.navigate('MailValidation');
    } catch (error) {
      console.error('Error al registrar usuario', error);
      Alert.alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>¡Bienvenido de nuevo!</Text>
            <Text style={styles.subTitle}>Crea una cuenta nueva</Text>
          </View>
          <View style={styles.formBox}>
            <Text style={styles.text}>Nombre</Text>
            <View style={styles.inputBox}>
              <TextInput
                ref={nombreInputRef}
                style={[styles.input, {color: 'white'}]}
                placeholder="Ingrese su nombre"
                value={nombre}
                placeholderTextColor="#ccc"
                onChangeText={setNombre}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => apellidoInputRef.current?.focus()}
              />
            </View>
            <Text style={styles.text}>Apellido</Text>
            <View style={styles.inputBox}>
              <TextInput
                ref={apellidoInputRef}
                style={[styles.input, {color: 'white'}]}
                placeholder="Ingrese su apellido"
                value={apellido}
                placeholderTextColor="#ccc"
                onChangeText={setApellido}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => dniInputRef.current?.focus()}
              />
            </View>
            <Text style={styles.text}>DNI</Text>
            <View style={styles.inputBox}>
              <TextInput
                ref={dniInputRef}
                style={[styles.input, {color: 'white'}]}
                placeholder="10771100"
                value={dni}
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                onChangeText={setDni}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => dniInputRef.current?.focus()}
              />
            </View>
            <Text style={styles.text}>Email</Text>
            <View style={styles.inputBox}>
              <TextInput
                ref={emailInputRef}
                style={[styles.input, {color: 'white'}]}
                placeholder="email@email.com"
                value={email}
                placeholderTextColor="#ccc"
                onChangeText={validateEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
            </View>
            {!!errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <Text style={styles.text}>Contraseña</Text>
            <View style={styles.inputBox}>
              <TextInput
                ref={passwordInputRef}
                placeholderTextColor="#ccc"
                style={[styles.input, {color: 'white'}]}
                placeholder="*************"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                returnKeyType="next"
                onSubmitEditing={() => repeatPasswordInputRef.current?.focus()}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={toggleShowPassword}>
                <Icon
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
              {!!errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            <Text style={styles.text}>Repetir contraseña</Text>
            <View style={styles.inputBox}>
              <TextInput
                ref={repeatPasswordInputRef}
                style={[styles.input, {color: 'white'}]}
                placeholder="*************"
                value={repeatPassword}
                placeholderTextColor="#ccc"
                onChangeText={validateRepeatPassword}
                secureTextEntry={!showPassword}
                returnKeyType="done"
                onSubmitEditing={handleRegister}
              />
              {!!errors.repeatPassword && (
                <Text style={styles.errorText}>{errors.repeatPassword}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#21233d',
  },
  containerTitle: {
    marginTop: height * 0.01,
    width: '80%',
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
    marginTop: height * 0.02,
  },
  formBox: {
    width: '80%',
    marginTop: height * 0.03,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: height * 0.03,
  },
  input: {
    borderBottomColor: '#ccc',
    padding: width * 0.02,
    flex: 1,
  },
  button: {
    backgroundColor: '#725599',
    padding: width * 0.04,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: height * -0.02,
  },
  eyeIcon: {
    position: 'absolute',
    top: height * 0.01,
    right: width * 0.02,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default RegisterScreen;
