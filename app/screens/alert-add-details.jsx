import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  FlatList,
} from 'react-native';

const logo = require('../assets/ui-icons/anadir-foto.png');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AlertAddDetails = () => {
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const navigation = useNavigation();

  const options = {
    mediaType: 'photo',
    title: 'select image',
    maxWidth: 2000,
    maxHeight: 2000,
    quality: 0.8,
  };
  const openImage = async () => {
    if (selectedImages.length < 3) {
      const result = await launchImageLibrary(options);
      if (
        !result.didCancel &&
        result.assets &&
        result.assets.length > 0 &&
        result.assets[0].uri
      ) {
        setSelectedImages(prevImages => [
          ...prevImages,
          {uri: result.assets[0].uri},
        ]);
      }
    }
  };

  const openCamera = async () => {
    if (selectedImages.length < 3) {
      const result = await launchCamera(options);
      if (
        !result.didCancel &&
        result.assets &&
        result.assets.length > 0 &&
        result.assets[0].uri
      ) {
        setSelectedImages(prevImages => [
          ...prevImages,
          {uri: result.assets[0].uri},
        ]);
      }
    }
  };

  const handleAddDetails = () => {
    navigation.navigate('AlertDetails');
    setDescription('');
    setSelectedImages([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Importante</Text>
      <Text style={styles.introText}>
        Esta información es crucial para la P.L.A y contribuirá
        significativamente a mejorar la eficacia de las respuestas de
        emergencia, garantizando un entorno más seguro para todos.
      </Text>
      <Text style={styles.title}>Detalles de la Alerta</Text>
      <TextInput
        style={[styles.input, {height: windowHeight * 0.1}]}
        placeholder="Descripción opcional"
        value={description}
        multiline
        numberOfLines={4}
        onChangeText={text => setDescription(text)}
      />
      <Text style={styles.titleCamera}>
        Agrega fotos (máximo {3 - selectedImages.length})
      </Text>
      <View style={styles.imageContainer}>
        <FlatList
          data={selectedImages}
          horizontal
          contentContainerStyle={styles.imageList}
          renderItem={({item}) => (
            <Image source={{uri: item.uri}} style={styles.selectedImage} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        {[...Array(3 - selectedImages.length)].map((_, index) => (
          <Image key={index} source={logo} style={styles.selectedImage} />
        ))}
      </View>

      <View style={styles.imageButtonsContainer}>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={openImage}
          disabled={selectedImages.length >= 3}>
          <Icon name="image-search" size={30} color="white" />
          <Text style={styles.imageButtonText}>Galería</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={openCamera}
          disabled={selectedImages.length >= 3}>
          <Icon name="camera" size={30} color="white" />
          <Text style={styles.imageButtonText}>Foto</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleAddDetails}>
        <Text style={styles.buttonText}>Enviar detalles</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: windowWidth * 0.05,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.02,
  },
  introText: {
    fontSize: 16,
    marginBottom: windowHeight * 0.02,
    textAlign: 'justify',
  },
  input: {
    height: windowHeight * 0.06,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: windowHeight * 0.02,
    padding: windowWidth * 0.02,
  },
  titleCamera: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.01,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: windowHeight * 0.02,
  },
  imageList: {
    justifyContent: 'center',
  },
  selectedImage: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    resizeMode: 'cover',
    borderRadius: 10,
    marginHorizontal: windowWidth * 0.02,
    marginTop: windowWidth * 0.04,
    marginBottom: windowWidth * 0.05,
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: windowHeight * 0.05,
  },
  cameraButton: {
    width: windowWidth * 0.27,
    height: windowWidth * 0.27,
    borderRadius: windowWidth * 0.15,
    backgroundColor: '#725599',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButtonText: {
    color: 'white',
    marginTop: windowHeight * 0.01,
  },
  submitButton: {
    backgroundColor: '#725599',
    padding: windowHeight * 0.02,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AlertAddDetails;
