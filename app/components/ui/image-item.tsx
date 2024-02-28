import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';

interface Props {
  source: string;
}
const screenWidth = Dimensions.get('window').width;

const ImageItem = ({source}: Props) => {
  return <Image source={{uri: source}} style={styles.selectedImage} />;
};

export default ImageItem;

const styles = StyleSheet.create({
  selectedImage: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    resizeMode: 'cover',
    borderRadius: 10,
    marginHorizontal: '3%',
    marginTop: '5%',
  },
});
