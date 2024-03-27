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

import logo from '../assets/ui-icons/usuario.png';
import {useFirebase} from '../context/firebase-context';

const {width, height} = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleEditarFoto = () => {
    navigation.navigate('EditarFotoPerfil');
  };

  const [profileData, setProfileData] = useState(null);

  const {FIREBASE_AUTH} = useFirebase();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;
        const displayName = currentUser.displayName;
        const phoneNumber = currentUser.phoneNumber;
        const photoURL = currentUser.photoURL;
        const dniUser = currentUser.dniUser;
        setProfileData({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: displayName || 'No verificado',
          photoURL: photoURL,
          phoneNumber: phoneNumber || 'XXX XXX',
          dniUser: dniUser || '12345678',
        });
      } catch (error) {
        console.error('Error al cargar datos:', error.message, error.stack);
      }
    };
    fetchData();
  }, []);

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
                profileData?.photoURL
                  ? {
                      uri: profileData?.photoURL,
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
              style={{
                position: 'relative',
                marginBottom: -height * 0.02,
                right: -width * 0.42,
                top: -height * 0.07,
              }}
            />
          </TouchableOpacity>
          <View style={styles.profileInfoContainer}>
            {profileData.displayName && (
              <>
                <Text style={styles.profileInfoLabel}>Nombre del Usuario:</Text>
                <Text style={styles.profileInfo}>
                  {profileData.displayName}
                </Text>
              </>
            )}
            {profileData.displayName && (
              <>
                <Text style={styles.profileInfoLabel}>Numero Cel:</Text>
                <Text style={styles.profileInfo}>
                  {profileData.phoneNumber}
                </Text>
              </>
            )}
            {profileData.displayName && (
              <>
                <Text style={styles.profileInfoLabel}>DNI</Text>
                <Text style={styles.profileInfo}>{profileData.dniUser}</Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.info}>DATOS ADICIONALES</Text>
          <View style={styles.profileInfoContainer}>
            {profileData.displayName && (
              <>
                <Text style={styles.profileInfoLabel}>Email:</Text>
                <Text style={styles.profileInfo}>{profileData.email}</Text>
              </>
            )}
            {profileData.displayName && (
              <>
                <Text style={styles.profileInfoLabel}>Nombre:</Text>
                <Text style={styles.profileInfo}>
                  {profileData.displayName}
                </Text>
              </>
            )}
            {profileData.displayName && (
              <>
                <Text style={styles.profileInfoLabel}>Nombre:</Text>
                <Text style={styles.profileInfo}>
                  {profileData.displayName}
                </Text>
              </>
            )}
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
