import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import logo from '../assets/ui-icons/usuario.png';
import {useFirebase} from '../context/firebase-context';

const EditarFotoPerfil = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const {FIREBASE_STORAGE, FIREBASE_AUTH} = useFirebase();

  const openImage = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 150,
      maxHeight: 150,
    };

    const result = await launchImageLibrary(options);
    if (
      !result.didCancel &&
      result.assets &&
      result.assets.length > 0 &&
      result.assets[0].uri
    ) {
      setSelectedImage({uri: result.assets[0].uri});
    }
  };

  const openCamera = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 150,
      maxHeight: 150,
    };

    const result = await launchCamera(options);
    if (
      !result.didCancel &&
      result.assets &&
      result.assets.length > 0 &&
      result.assets[0].uri
    ) {
      setSelectedImage({uri: result.assets[0].uri});
    }
  };

  const handleConfirm = async () => {
    try {
      const reference = FIREBASE_STORAGE.ref(
        `images/${FIREBASE_AUTH.currentUser.uid}-profile-photo.jpg`,
      );
      const pathToFile = selectedImage.uri;
      await reference.putFile(pathToFile);
      Alert.alert('Imagen confirmada y guardada correctamente');
    } catch (error) {
      Alert.alert('Error al guardar la imagen', error);
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Editar Foto de Perfil</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.profileContainer}>
          <View style={styles.profilePicture}>
            <Image
              source={
                selectedImage && selectedImage.localUri
                  ? {uri: selectedImage.localUri}
                  : logo
              }
              style={styles.profileImage}
            />
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={openCamera}>
              <Icon name="camera" size={52} color="gray" />
              <Text style={styles.text}>Cámara</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={openImage}>
              <Icon name="image-outline" size={52} color="gray" />
              <Text style={styles.text}>Galería</Text>
            </TouchableOpacity>
          </View>

          {selectedImage && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleConfirm}
                style={styles.confirmButton}>
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCancel}
                style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}
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
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  body: {
    width: '80%',
  },
  profileContainer: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  profilePicture: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default EditarFotoPerfil;
