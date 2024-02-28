import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import {ImageType} from '../types';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageList from '../components/ui/image-list';
import Title from '../components/ui/title';
import IntroText from '../components/ui/intro-text';
import {uiText} from '../constants/ui.constans';
import InputText from '../components/ui/text-input';
import Label from '../components/ui/label';

const logo = require('../assets/ui-icons/anadir-foto.png');

const screenWidth = Dimensions.get('window').width;

const AlertAddDetails = () => {
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState<ImageType[]>([]);
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
      const result = (await launchImageLibrary(options as any)) as {
        assets: ImageType[];
        didCancel: boolean;
      };
      if (!result.didCancel) {
        setSelectedImages(
          prevImages =>
            [...prevImages, {uri: result.assets[0].uri}] as ImageType[],
        );
      }
    }
  };

  const openCamera = async () => {
    if (selectedImages.length < 3) {
      const result = (await launchCamera(options as any)) as {
        assets: ImageType[];
        didCancel: boolean;
      };
      if (!result.didCancel) {
        setSelectedImages(
          prevImages =>
            [...prevImages, {uri: result.assets[0].uri}] as ImageType[],
        );
      }
    }
  };

  const handleAddDetails = () => {
    navigation.navigate('AlertDetails' as never);
    setDescription('');
    setSelectedImages([]);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        <Title content={uiText.AddAlertDetails.title1} />
        <IntroText content={uiText.AddAlertDetails.textIntro} />
        <Label content={uiText.AddAlertDetails.label} />
        <InputText
          placeholder={uiText.AddAlertDetails.placeholder}
          value={description}
          onChangeTextCallback={setDescription}
        />
        <Text style={styles.titleCamera}>
          Agrega fotos (máximo {3 - selectedImages.length})
        </Text>
        <View style={styles.imageContainer}>
          <ImageList data={selectedImages} />
          {[...Array(3 - selectedImages.length)].map((_, index) => (
            <Image key={index} source={logo} />
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
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleAddDetails}>
          <Text style={styles.buttonText}>Guardar Alerta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: '4%',
    justifyContent: 'space-around',
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '4%',
  },
  imageButtonText: {
    color: 'white',
    marginTop: '2%',
  },
  submitButton: {
    backgroundColor: '#725599',
    padding: '5%',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  titleCamera: {
    textAlign: 'center',
    fontSize: screenWidth * 0.06,
    fontWeight: 'bold',
    marginBottom: '2%',
  },
  cameraButton: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: screenWidth * 0.15,
    backgroundColor: '#725599',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '7%',
  },
});

export default AlertAddDetails;
