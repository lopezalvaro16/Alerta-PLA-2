import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Animated,
  Text,
  FlatList,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Main from './main-screen';
import ProfileScreen from './profile-screen';
import MovimientosScreen from './movements-screen';
import UserSettingsScreen from './config-screen';
import NumeroEmergencia from './number-emergency';

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
            navigation.navigate('Home');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#3a284e'}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Image
            source={require('../assets/ui-icons/usuario.png')}
            style={{width: 70, height: 70, borderRadius: 35, marginLeft: 20}}
          />
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 22, fontWeight: '800', color: '#fff'}}>
              Lopez ALvaro
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 5,
                fontWeight: '800',
                color: '#fff',
              }}>
              Texto descriptivo
            </Text>
          </View>
        </View>
        <View style={{marginTop: 30}}>
          <FlatList
            data={menus}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  width: 200,
                  height: 50,
                  marginLeft: 20,
                  marginTop: 20,
                  backgroundColor:
                    selectedMenuItem === index ? '#725599' : '#6600ff',
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
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
                    width: 24,
                    height: 24,
                    marginLeft: 15,
                    tintColor: selectedMenuItem === index ? '#000' : '#fff',
                  }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 20,
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
          flex: 1,
          backgroundColor: 'white',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          transform: [{scale}, {translateX: moveToRight}],
          borderRadius: showMenu ? 15 : 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 70,
          }}>
          <TouchableOpacity
            style={{marginLeft: 20}}
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
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            ) : (
              <Icon name="arrow-back" size={40} color="black" />
            )}
          </TouchableOpacity>
          <Text style={{marginLeft: 20, fontSize: 20, fontWeight: '800'}}>
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

export default YourDrawerScreen;
