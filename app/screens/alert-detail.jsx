import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  PermissionsAndroid,
  Appearance,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {useAlert} from '../context/AlertContext';
import {useSocket} from '../context/SocketContext';
import {useFirebase} from '../context/firebase-context';
import {GOOGLE_API_KEY} from '../constants/api-constans';

Geocoder.init(GOOGLE_API_KEY);

const AlertDetail = () => {
  const navigation = useNavigation();
  const {alert} = useAlert();
  const {emit} = useSocket();
  const {FIRESTORE_DB, FIREBASE_AUTH} = useFirebase();

  const alertType = alert?.alertType || 'N/A';
  const alertImage = alert?.alertImage;
  const date = alert?.date;
  const color = alert?.color;

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAlert, setLoadingAlert] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchGeoLocationPermissons = async () => {
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
          console.log('You can use the location');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    fetchGeoLocationPermissons();

    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);

  const fetchLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords);
        getAddressFromCoordinates(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      error => console.error('Error getting location:', error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const addressResponse = await Geocoder.from({
        latitude,
        longitude,
      });

      let streetNumber = '';
      let route = '';
      let city = '';
      let country = '';

      addressResponse.results[0].address_components.forEach(component => {
        if (component.types.includes('street_number')) {
          streetNumber = component.long_name;
        } else if (component.types.includes('route')) {
          route = component.long_name;
        } else if (component.types.includes('locality')) {
          city = component.long_name;
        } else if (component.types.includes('country')) {
          country = component.long_name;
        }
      });
      setAddress({
        street: `${streetNumber} ${route}`,
        subregion: city,
        country: country,
      });
    } catch (error) {
      setShowError(true);
      console.error('Error fetching address:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchLocation();
    setRefreshing(false);
  };

  const handleSendLocationPress = async () => {
    const user = FIREBASE_AUTH.currentUser;
    const newDate = new Date();
    const hour = newDate.toLocaleTimeString('es-AR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const formattedDate = newDate.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (user) {
      setLoadingAlert(true);
      const locationBody = {
        latitude: location?.latitude,
        longitude: location?.longitude,
        userId: user.uid,
        alertType,
        status: 'pending',
        createdAt: new Date(),
        hour,
        date: formattedDate,
        color,
      };
      console.log('🚀 ~ handleSendLocationPress ~ locationBody:', locationBody);
      try {
        await FIRESTORE_DB.collection('alerts').add(locationBody);
        emit('create alert', locationBody);
        showSuccessAlert();
      } catch (error) {
        console.log(' ~ handleSendLocationPress ~ error:', error.message);
      } finally {
        setLoadingAlert(false);
      }
    } else {
      console.error('El usuario no está autenticado');
    }
    showSuccessAlert();
    console.log('HANDLE SEND LOCATION');
  };

  const showSuccessAlert = () => {
    navigation.navigate('TipsAlert', {alertType});
  };

  const capitalizeFirstLetter = string => {
    const capitalizedString = string.charAt(0).toUpperCase() + string.slice(1);
    return capitalizedString.replace(/\b([A-Za-z]{3})\./g, '$1');
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000' : '#C9d9EC'},
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <Icon
              name="arrow-back"
              size={30}
              color={isDarkMode ? 'white' : 'black'}
            />
          </TouchableOpacity>
          <View style={styles.containerText}>
            <Icon name="checkmark-circle" size={34} color="green" />
            <Text
              style={[
                styles.confirmText,
                {color: isDarkMode ? 'white' : 'black'},
              ]}>
              ¡Confirme su alerta!
            </Text>
          </View>
          <View style={styles.containerStatus}>
            <Text
              style={[
                styles.dateTime,
                {
                  backgroundColor: isDarkMode ? 'black' : 'white',
                  color: isDarkMode ? 'white' : 'black',
                },
              ]}>
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
            {loading ? (
              <>
                {showError ? (
                  <View style={styles.conteinerError}>
                    <Text
                      style={[
                        styles.errorText,
                        {color: isDarkMode ? 'white' : 'black'},
                      ]}>
                      Fallo al cargar su ubicación, deslice pantalla para abajo{' '}
                    </Text>
                    <Icon name="refresh-circle" size={30} color="gray" />
                  </View>
                ) : (
                  <>
                    <ActivityIndicator size="small" color="#6600ff" />
                    <Text
                      style={[
                        styles.loadingText,
                        {color: isDarkMode ? 'white' : 'black'},
                      ]}>
                      Cargando ubicación...
                    </Text>
                  </>
                )}
              </>
            ) : (
              <>
                <Icon
                  style={{marginRight: 10}}
                  name="location"
                  size={30}
                  color="gray"
                />
                <Text
                  style={[
                    styles.senderAddress,
                    {color: isDarkMode ? 'white' : 'black'},
                  ]}>
                  {address?.street || 'N/A'} {'\n'}
                  {address?.subregion ? `${address?.subregion}, ` : ''}
                  {address?.name ? `${address?.name}, ` : ''}
                  {address?.country || 'N/A'}
                </Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.content}>
          <Text
            style={[
              styles.alertName,
              {color: isDarkMode ? 'white' : 'black'},
            ]}>{`${alertType}`}</Text>
          <Image source={alertImage} style={styles.image} />
        </View>
        <View style={styles.contentButton}>
          <TouchableOpacity
            onPress={handleSendLocationPress}
            style={
              loadingAlert ? styles.confirmButtonDisabled : styles.confirmButton
            }
            disabled={loadingAlert}>
            {loadingAlert ? (
              <View style={styles.buttonContent}>
                <ActivityIndicator size="small" color="white" />
                <Text
                  style={[
                    styles.confirmButtonTextDisabled,
                    {color: isDarkMode ? 'black' : 'white'},
                  ]}>
                  Enviando alerta...
                </Text>
              </View>
            ) : (
              <Text
                style={[
                  styles.confirmButtonText,
                  {color: isDarkMode ? 'black' : 'white'},
                ]}>
                Confirmar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  confirmButtonTextDisabled: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: width * 0.02,
  },
  confirmButtonDisabled: {
    backgroundColor: '#b3b3b3',
    padding: width * 0.04,
    borderRadius: width * 0.02,
    width: '90%',
    opacity: 0.7,
  },
});

export default AlertDetail;
