import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
// import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_URL} from '../constants/api-constans';

interface Address {
  street: string;
  subregion: string;
  country: string;
}

interface AlertDetailProps {}

interface RouteParams {
  date?: string;
  alertType?: string;
  alertImage?: any; // Reemplaza 'any' con el tipo correcto para alertImage
}

const AlertDetail: React.FC<AlertDetailProps> = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const routeParams = route.params as RouteParams | undefined;
  const alertType = routeParams?.alertType || 'N/A';
  const alertImage = routeParams?.alertImage;

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [showSentMessage, setShowSentMessage] = useState(false);

  const date = routeParams?.date
    ? new Date(routeParams.date).toISOString()
    : null;

  const handleSendLocationPress = async () => {
    const locationBody = {
      latitude: location?.latitude,
      longitude: location?.longitude,
      userId: 2,
      alertTypeId: 1,
    };
    try {
      const response = await fetch(`${API_URL}/alerts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(locationBody),
      });
      // Toast.show({
      //   type: 'success',
      //   visibilityTime: 2400,
      //   autoHide: true,
      // });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      setShowSentMessage(true);
      // navigation.goBack();
      showSuccessAlert();
    } catch (error) {
      // Toast.show({
      //   type: 'error',
      //   text: error,
      //   visibilityTime: 2400,
      //   autoHide: true,
      // });
    } finally {
      setTimeout(() => {
        setShowSentMessage(false);
      }, 1500);
    }
  };

  const showSuccessAlert = () => {
    Alert.alert(
      '¡Alerta enviada con éxito!',
      'Gracias por contribuir a la seguridad de la comunidad. Para mejorar el sistema por favor agregue una descripción si es necesaria.',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('No ira a movimientos'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('Se fue a movimientos');
            navigation.navigate('AlertConfirm' as never);
          },
        },
      ],
    );
  };

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Acceso a geolocalización',
            message:
              'Alerta-PLA App necesita acceder a tu localización para acudir a en tu ayuda',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          fetchLocation();
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    const fetchLocation = async () => {
      Geolocation.getCurrentPosition(
        (position: {coords: {latitude: number; longitude: number}}) => {
          setLocation(position.coords);
          getAddressFromCoordinates(
            position.coords.latitude,
            position.coords.longitude,
          );
        },
        (error: object) => console.error('Error getting location:', error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    };
    requestCameraPermission();
  }, []);

  const handleBackPress = () => {
    // navigation.goBack();
    console.log('hola');
  };

  const getAddressFromCoordinates = async (
    latitude: number,
    longitude: number,
  ) => {
    try {
      const addressResponse = await Geolocation.reverseGeocode({
        latitude,
        longitude,
      });

      if (addressResponse && addressResponse.length > 0) {
        const {street, name, subregion, country} = addressResponse[0];
        setAddress({
          street: `${street} ${name}`,
          subregion,
          country,
        });
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const capitalizeFirstLetter = (string: string) => {
    const capitalizedString = string.charAt(0).toUpperCase() + string.slice(1);
    return capitalizedString.replace(/\b([A-Za-z]{3})\./g, '$1');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.containerText}>
          <Icon name="checkmark-circle" size={34} color="green" />
          <Text style={styles.confirmText}>¡Confirme su alerta!</Text>
        </View>
        <View style={styles.containerStatus}>
          <Text style={styles.dateTime}>
            {date
              ? capitalizeFirstLetter(
                  new Date(date).toLocaleString('es-AR', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: 'America/Argentina/Buenos_Aires',
                  }),
                )
              : 'N/A'}
          </Text>
        </View>
        <View style={styles.containerUbi}>
          <Icon
            style={{marginRight: 10}}
            name="location"
            size={30}
            color="gray"
          />
          <Text style={styles.senderAddress}>
            Dirección: {address?.street || 'N/A'} {'\n'}
            {address?.subregion || 'N/A'}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.alertName}>{`${alertType}`}</Text>
        <Image source={alertImage} style={styles.image} />
      </View>
      <View style={styles.contentButton}>
        <TouchableOpacity
          onPress={handleSendLocationPress}
          style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
      {showSentMessage && (
        <View style={styles.sentMessage}>
          <Text style={styles.sentMessageText}>Alerta enviada con éxito</Text>
        </View>
      )}
    </View>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9d9EC',
  },
  header: {
    paddingTop: height * 0.05,
    paddingLeft: width * 0.02,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.04,
  },
  contentButton: {
    marginTop: height * 0.01,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    display: 'flex',
    flexDirection: 'row',
    margin: width * 0.01,
    marginTop: height * 0.06,
  },
  image: {
    width: width * 0.6,
    height: height * 0.3,
    borderRadius: width * 0.4,
    marginBottom: height * 0.02,
  },
  confirmText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginLeft: width * 0.02,
    margin: height * 0.01,
  },
  containerUbi: {
    display: 'flex',
    flexDirection: 'row',
    margin: width * 0.01,
  },
  containerStatus: {
    margin: width * 0.03,
  },
  dateTime: {
    fontSize: width * 0.065,
    marginBottom: height * 0.01,
    backgroundColor: 'white',
    width: width * 0.6,
    borderRadius: width * 0.03,
    borderColor: 'black',
    padding: width * 0.03,
  },
  alertName: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
    margin: width * 0.03,
  },
  senderAddress: {
    fontSize: width * 0.03,
  },
  confirmButton: {
    backgroundColor: '#6600ff',
    padding: width * 0.04,
    borderRadius: width * 0.02,
    width: '90%',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sentMessageText: {
    color: 'white',
  },
  sentMessage: {
    position: 'absolute',
    top: height * 0.01,
    left: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    padding: width * 0.03,
    borderRadius: width * 0.01,
    alignItems: 'center',
  },
});

export default AlertDetail;
