import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import alertasData from '../Tips.json';
import {useNavigation} from '@react-navigation/native';

const importImage = alertType => {
  switch (alertType.toLowerCase()) {
    case 'alerta de robo':
      return require('../assets/alerts/AlertaRobo.png');
    case 'alerta vial':
      return require('../assets/alerts/alertaVial2.png');
    case 'violencia de genero':
      return require('../assets/alerts/alertaDeGenero.png');
    default:
      return require('../assets/alerts/alertaGeneral2.png');
  }
};

const TipsView = ({route}) => {
  const navigation = useNavigation();
  const [tips, setTips] = useState([]);
  const alertType = route.params?.alertType || 'Alerta Desconocida';

  useEffect(() => {
    if (
      alertasData &&
      alertasData.alertas &&
      typeof alertasData.alertas === 'object'
    ) {
      const alertTypeKey = Object.keys(alertasData.alertas).find(key =>
        alertasData.alertas[key].titulo
          .toLowerCase()
          .includes(alertType.toLowerCase()),
      );

      const alertTypeData = alertasData.alertas[alertTypeKey];
      const alertInfo = alertTypeData || {
        titulo: 'Alerta Desconocida',
        recomendaciones: ['No hay información disponible.'],
      };

      setTips(alertInfo.recomendaciones);
    } else {
      console.error('Error: No se pudo obtener la información del JSON.');
    }
  }, [route, alertType]);

  const handleOmitirPress = () => {
    navigation.navigate('YourDrawerScreen');
  };

  const handleDetallesPress = () => {
    navigation.navigate('AlertAddDetail');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.imagen}>
          <Image source={importImage(alertType)} style={styles.image} />
        </View>
        <Text style={styles.title}>
          {tips.length > 0
            ? `Consejos para ${alertType}`
            : 'Alerta Desconocida'}
        </Text>
        <View style={styles.tipsContainer}>
          {tips.length > 0 ? (
            tips.map((tip, index) => (
              <Text key={index} style={styles.tip}>
                {tip}
              </Text>
            ))
          ) : (
            <Text style={styles.tip}>No hay información disponible.</Text>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleDetallesPress}>
          <Text style={styles.buttonText}>Agregar Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOmit} onPress={handleOmitirPress}>
          <Text style={styles.buttonText}>Omitir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#CcdcEC',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: "center",
    padding: 16,
  },
  imagen: {
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333333',
  },
  tipsContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  tip: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    color: '#555555',
  },
  button: {
    backgroundColor: '#663399',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonOmit: {
    backgroundColor: '#6600ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TipsView;
