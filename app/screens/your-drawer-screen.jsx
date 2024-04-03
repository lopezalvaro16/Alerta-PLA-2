import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Animated,
  Text,
  FlatList,
  StatusBar,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Main from './main-screen';
import ProfileScreen from './profile-screen';
import MovimientosScreen from './movements-screen';
import UserSettingsScreen from './config-screen';
import NumeroEmergencia from './number-emergency';
import {useFirebase} from '../context/firebase-context';

const menus = [
  {icon: require('../assets/ui-icons/siren.png'), title: 'Alertas'},
  {icon: require('../assets/ui-icons/usuario.png'), title: 'Perfil'},
  {icon: require('../assets/ui-icons/flecha.png'), title: 'Movimientos'},
  {
    icon: require('../assets/ui-icons/configuracion.png'),
    title: 'Configuración',
  },
  {
    icon: require('../assets//ui-icons/llamada-telefonica.png'),
    title: 'Telefonos',
  },
  {icon: require('../assets/ui-icons/cerrar-sesion.png'), title: 'Salir'},
];

const YourDrawerScreen = () => {
  const [showMenu, setShowMenu] = useState(false);
  const moveToRight = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(showMenu ? 0.7 : 1)).current;
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const navigation = useNavigation();
  const {FIREBASE_AUTH, FIRESTORE_DB} = useFirebase();

  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;
        const response = await FIRESTORE_DB.collection('users')
          .where('uid', '==', currentUser.uid)
          .get();
        const userData = response._docs[0]._data;
        const displayName = `${userData.nombre} ${userData.apellido}`;
        setDisplayName(displayName);
      } catch (error) {
        console.error('Error al cargar datos:', error.message, error.stack);
      }
    };
    fetchUserData();
  }, [FIREBASE_AUTH, FIRESTORE_DB]);

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: () => {
            FIREBASE_AUTH.signOut();
            navigation.navigate('Home');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.container2}>
          <Image
            source={require('../assets/ui-icons/usuario.png')}
            style={styles.image}
          />
          <View style={styles.view1}>
            <Text style={styles.nameText}>{displayName}</Text>
          </View>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={menus}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  ...styles.logoutBtn,
                  backgroundColor:
                    selectedMenuItem === index ? '#725599' : '#6600ff',
                }}
                onPress={() => {
                  if (item.title === 'Salir') {
                    handleLogout();
                  } else {
                    setSelectedMenuItem(index);
                    setShowMenu(!showMenu);
                    Animated.timing(scale, {
                      toValue: showMenu ? 1 : 0.7,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();
                    Animated.timing(moveToRight, {
                      toValue: showMenu ? 0 : 250,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();
                  }
                }}>
                <Image
                  source={item.icon}
                  style={{
                    ...styles.logoutIcon,
                    tintColor: selectedMenuItem === index ? '#000' : '#fff',
                  }}
                />
                <Text
                  style={{
                    ...styles.logoutItemTitle,
                    color: selectedMenuItem === index ? '#000' : '#fff',
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <Animated.View
        style={{
          ...styles.animatedView,
          transform: [{scale}, {translateX: moveToRight}],
          borderRadius: showMenu ? 15 : 0,
        }}>
        <View style={styles.animatedViewContainer}>
          <TouchableOpacity
            style={styles.animatedViewTouchable}
            onPress={() => {
              Animated.timing(scale, {
                toValue: showMenu ? 1 : 0.7,
                duration: 300,
                useNativeDriver: true,
              }).start();
              Animated.timing(moveToRight, {
                toValue: showMenu ? 0 : 250,
                duration: 300,
                useNativeDriver: true,
              }).start();
              setShowMenu(!showMenu);
            }}>
            {!showMenu ? (
              <Image
                source={require('../assets/ui-icons/menu.png')}
                style={styles.animatedViewImage}
              />
            ) : (
              <Icon name="arrow-back" size={40} color="black" />
            )}
          </TouchableOpacity>
          <Text style={styles.animatedViewTxt}>
            {menus[selectedMenuItem].title}
          </Text>
        </View>

        {menus[selectedMenuItem].title === 'Alertas' && <Main />}
        {menus[selectedMenuItem].title === 'Perfil' && <ProfileScreen />}
        {menus[selectedMenuItem].title === 'Movimientos' && (
          <MovimientosScreen />
        )}
        {menus[selectedMenuItem].title === 'Configuración' && (
          <UserSettingsScreen />
        )}
        {menus[selectedMenuItem].title === 'Telefonos' && <NumeroEmergencia />}
      </Animated.View>

      <StatusBar backgroundColor="black" barStyle="light-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  container1: {flex: 1, backgroundColor: '#3a284e'},
  container2: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  image: {width: 70, height: 70, borderRadius: 35, marginLeft: 20},
  view1: {marginLeft: 20},
  nameText: {fontSize: 22, fontWeight: '800', color: '#fff'},
  textDescription: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '800',
    color: '#fff',
  },
  flatListContainer: {marginTop: 30},
  logoutBtn: {
    width: 200,
    height: 50,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIcon: {
    width: 24,
    height: 24,
    marginLeft: 15,
  },
  logoutItemTitle: {
    fontSize: 18,
    marginLeft: 20,
  },
  animatedView: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  animatedViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
  },
  animatedViewImage: {
    width: 30,
    height: 30,
  },
  animatedViewTouchable: {marginLeft: 20},
  animatedViewTxt: {marginLeft: 20, fontSize: 20, fontWeight: '800'},
});

export default YourDrawerScreen;
