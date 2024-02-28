import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import ImageItem from './image-item';
import {ImageType} from '../../types';

const ImageList = ({data}: {data: ImageType[]}) => {
  return (
    <FlatList
      data={data}
      horizontal
      contentContainerStyle={styles.imageList}
      renderItem={({item}) => <ImageItem source={item.uri} />}
      keyExtractor={(_item, index) => index.toString()}
    />
  );
};

export default ImageList;

const styles = StyleSheet.create({
  imageList: {
    justifyContent: 'center',
  },
});
