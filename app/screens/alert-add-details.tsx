import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {ImageType} from '../types';
import {SafeAreaView} from 'react-native-safe-area-context';

const logo = require('../assets/ui-icons/anadir-foto.png');

const screenWidth = Dimensions.get('window').width;

const options = {
  mediaType: 'photo',
  title: 'select image',
  maxWidth: 2000,
  maxHeight: 2000,
  quality: 0.8,
  // includeBase64: true,
};

interface ImageItem {
  localUri: string;
}

const AlertAddDetails = () => {
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState<ImageItem[]>([
    {
      localUri: '',
    },
    {
      localUri: '',
    },
    {
      localUri: '',
    },
  ]);
  const navigation = useNavigation();

  useEffect(() => {
    console.log(selectedImages);
  }, [selectedImages]);

  const openImage = async () => {
    if (selectedImages.length < 3) {
      const result = (await launchImageLibrary(options as any)) as {
        assets: ImageType[];
        canceled: boolean;
      };
      if (!result.canceled) {
        setSelectedImages(prevImages => [
          ...prevImages,
          {localUri: result.assets[0].uri},
        ]);
      }
    }
  };

  const openCamera = async () => {
    if (selectedImages.length < 3) {
      const result = (await launchCamera(options as any)) as {
        assets: ImageType[];
        canceled: boolean;
      };
      if (!result.canceled) {
        setSelectedImages(prevImages => [
          ...prevImages,
          {localUri: result.assets[0].uri},
        ]);
      }
    }
  };

  const handleAddDetails = () => {
    navigation.navigate('AlertDetails' as never);
    setDescription('');
    setSelectedImages([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Importante</Text>
      <Text style={styles.introText}>
        Tu participación es clave para fortalecer la seguridad. Por favor,
        agrega detalles adicionales sobre la alerta, como una descripción
        opcional y fotos relevantes. Esta información es crucial para la policía
        de PLA y contribuirá significativamente a mejorar la eficacia de las
        respuestas de emergencia, garantizando un entorno más seguro para todos.
      </Text>
      <Text style={styles.title}>Detalles de la Alerta</Text>
      <TextInput
        style={styles.input}
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
        {selectedImages?.map((item, index) => (
          <Image
            key={index}
            source={item?.localUri ? {uri: item.localUri} : logo}
            style={styles.selectedImage}
          />
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
        <Text style={styles.buttonText}>Guardar Alerta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -10,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: screenWidth * 0.06,
    fontWeight: 'bold',
  },
  introText: {
    fontSize: 17,
    textAlign: 'justify',
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  titleCamera: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  selectedImage: {
    width: 100,
    height: 100,
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cameraButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#725599',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButtonText: {
    color: 'white',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#725599',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AlertAddDetails;
