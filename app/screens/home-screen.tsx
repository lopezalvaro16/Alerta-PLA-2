import auth from '@react-native-firebase/auth';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

// import logo from '../assets/icon.jpg';

interface HomeScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        navigation.navigate('YourDrawerScreen');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <Image source={logo} style={styles.logo} /> */}
        <Text style={styles.logoText}>Ciudad Segura PLA</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.securityInfo}>¡Bienvenido!</Text>
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonReg} onPress={handleRegister}>
            <Text style={styles.buttonTextReg}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}> © 2023 Alerta PLA.</Text>
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#21233d',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.1,
  },
  logo: {
    width: width * 0.45,
    height: width * 0.45,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
    color: 'white',
  },
  contentContainer: {
    width: '80%',
    marginBottom: height * 0.12,
  },
  securityInfo: {
    fontSize: width * 0.09,
    textAlign: 'center',
    marginBottom: height * 0.02,
    color: 'white',
  },
  buttonReg: {
    backgroundColor: '#725599',
    padding: height * 0.02,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: height * 0.02,
    borderColor: 'white',
    borderWidth: 1,
  },
  containerButton: {
    marginTop: height * 0.04,
    marginHorizontal: width * 0.05,
  },
  button: {
    backgroundColor: '#fff',
    padding: height * 0.02,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  buttonTextReg: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: '700',
  },
  buttonText: {
    color: '#725599',
    fontSize: width * 0.04,
    fontWeight: '700',
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

export default HomeScreen;
