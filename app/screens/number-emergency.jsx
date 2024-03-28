import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';

const EmergencyNumbersView = () => {
  const emergencyNumbers = [
    {
      title: 'Policía Local Alderetes',
      number: '494-6764',
      logo: require('../assets/logos/logo-pla.png'),
    },
    {
      title: 'Centro de Monitoreo',
      number: '4945184',
      logo: require('../assets/logos/logo.png'),
    },

    {
      title: 'Emergencia Médica',
      number: '107',
      logo: require('../assets/logos/107.png'),
    },
    {
      title: 'Defensa Civil',
      number: '103',
      logo: require('../assets/logos/defensa-civil.png'),
    },
    {
      title: 'Bomberos voluntarios',
      number: '4941731',
      logo: require('../assets/logos/bomberos-vol.png'),
    },
    {
      title: 'Comisaria de guemes',
      number: '4269820',
      logo: require('../assets/logos/policia-local.png'),
    },
    {
      title: 'Patrulla Motorizada',
      number: '156061129',
      logo: require('../assets/logos/policia-mot.png'),
    },
    {
      title: 'Emergencia Policial',
      number: '911',
      logo: require('../assets/logos/911.jpg'),
    },
    {
      title: 'Comisaria de alderetes',
      number: '4940408',
      logo: require('../assets/logos/logo-pla.png'),
    },

    {
      title: 'Celular Brigada U.R.E',
      number: '156738638',
      logo: require('../assets/logos/logo-pla.png'),
    },
  ];

  const handlePress = number => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.row}>
          {emergencyNumbers.map((item, index) => (
            <View key={index} style={styles.cardContainer}>
              <TouchableOpacity
                style={styles.numberContainer}
                onPress={() => handlePress(item.number)}>
                <Image source={item.logo} style={styles.logo} />
                <View style={styles.titleContainer}>
                  <Text style={[styles.title, {color: 'gray'}]}>
                    {item.number}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.title}>
                <Text style={styles.titleText}>{item.title}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#C9d9EC',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.03,
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    marginBottom: height * 0.03,
    width: '47%',
    alignItems: 'center',
  },
  titleContainer: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
    // margin: 10,
  },
  title: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  numberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: 200,
    width: 180,
    borderRadius: width * 0.05,
    backgroundColor: '#f0f0f0',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  logo: {
    width: 125,
    height: 125,
    objectFit: 'contain',
    // marginBottom: 10,
  },
});

export default EmergencyNumbersView;
