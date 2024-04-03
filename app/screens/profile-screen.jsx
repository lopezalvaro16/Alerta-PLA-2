import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useFirebase} from '../context/firebase-context';
import {useProfilePhoto} from '../context/ProfilePhotoContext';

const {width, height} = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleEditarFoto = () => {
    navigation.navigate('EditarFotoPerfil');
  };

  const [profileData, setProfileData] = useState(null);
  const {profilePhotoURLDownload} = useProfilePhoto();

  const {FIREBASE_AUTH, FIRESTORE_DB} = useFirebase();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;
        const response = await FIRESTORE_DB.collection('users')
          .where('uid', '==', currentUser.uid)
          .get();
        const userData = response._docs[0]._data;
        const displayName = `${userData.nombre} ${userData.apellido}`;
        const phoneNumber = userData.telefono;
        const photoURL = userData.photoURL;
        const dniUser = userData.dni;
        setProfileData({
          email: currentUser.email,
          displayName: displayName || 'No verificado',
          photoURL: photoURL,
          phoneNumber: phoneNumber || '--- ---',
          dniUser: dniUser || '--- ---',
        });
      } catch (error) {
        console.error('Error al cargar datos:', error.message, error.stack);
      }
    };
    fetchData();
  }, [FIREBASE_AUTH, FIRESTORE_DB]);

  if (!profileData) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.profileContainer}>
          <View style={styles.profilePicture}>
            <Image
              style={styles.profileImage}
              source={
                profilePhotoURLDownload
                  ? {
                      uri: profilePhotoURLDownload,
                    }
                  : require('../assets/ui-icons/usuario.png')
              }
            />
          </View>
          <TouchableOpacity onPress={handleEditarFoto}>
            <Icon
              name="camera"
              size={width * 0.1}
              color="gray"
              style={styles.icon}
            />
          </TouchableOpacity>
          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileInfoLabel}>Nombre del Usuario:</Text>
            <Text style={styles.profileInfo}>{profileData.displayName}</Text>
            <Text style={styles.profileInfoLabel}>DNI</Text>
            <Text style={styles.profileInfo}>{profileData.dniUser}</Text>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.info}>DATOS ADICIONALES</Text>
          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileInfoLabel}>Email:</Text>
            <Text style={styles.profileInfo}>{profileData.email}</Text>
            <Text style={styles.profileInfoLabel}>Numero Cel:</Text>
            <Text style={styles.profileInfo}>{profileData.phoneNumber}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C9d9EC',
  },
  body: {
    width: '80%',
  },
  profileContainer: {
    marginBottom: height * 0.02,
    borderRadius: 10,
    padding: width * 0.04,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    position: 'relative',
    marginBottom: -height * 0.02,
    right: -width * 0.42,
    top: -height * 0.07,
  },
  info: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
    textAlign: 'center',
    color: '#333333',
  },
  profilePicture: {
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
  },
  profileInfoContainer: {
    alignItems: 'center',
  },
  profileInfoLabel: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#725599',
  },
  profileInfo: {
    fontSize: width * 0.04,
    marginVertical: height * 0.005,
    color: '#666666',
  },
});

export default ProfileScreen;
