import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import alertaRobo from '../assets/alerts/AlertaRobo.png';
import alertaWoman from '../assets/alerts/alertaDeGenero.png';
import alertaGeneral from '../assets/alerts/alertaGeneral2.png';
import alertaVial from '../assets/alerts/alertaVial2.png';
import {useAlert} from '../context/AlertContext';

const Main = () => {
  const navigation = useNavigation();
  const {buildAlert} = useAlert();

  const handleAlertDetail = (alertType, alertImage, color) => {
    const currentDate = new Date().toISOString();
    buildAlert({date: currentDate, alertType, alertImage, color});
    navigation.navigate({
      name: 'AlertConfirm',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.alertRobo}
            onPress={() => {
              handleAlertDetail('Alerta de Robo', alertaRobo, '#ff5500');
            }}>
            <Image source={alertaRobo} style={styles.image} />
            <Text style={styles.textAlert}>Alerta de robo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.alertVial}
            onPress={() => {
              handleAlertDetail('Alerta Vial', alertaVial, '#008000');
            }}>
            <Image source={alertaVial} style={styles.image} />
            <Text style={styles.textAlert}>Alerta vial</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.alertGenero}
            onPress={() => {
              handleAlertDetail('Violencia de Genero', alertaWoman, '#800080');
            }}>
            <Image source={alertaWoman} style={styles.image} />
            <Text style={styles.textAlert}>V. de Género</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.alertOtros}
            onPress={() => {
              handleAlertDetail('Otras Alertas', alertaGeneral, '#ccc');
            }}>
            <Image source={alertaGeneral} style={styles.image} />
            <Text style={styles.textAlert}>Otras alertas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C9d9EC',
  },
  row: {
    flexDirection: 'row',
    marginBottom: height * 0.02,
  },
  alertRobo: {
    flex: 1,
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: width * 0.05,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
  },
  alertVial: {
    flex: 1,
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: width * 0.05,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
  },
  alertGenero: {
    flex: 1,
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: width * 0.05,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
  },
  alertOtros: {
    flex: 1,
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: width * 0.05,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAlert: {
    fontSize: width * 0.06,
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
  },
});

export default Main;
