import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Splash: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('YourDrawerScreen' as never);
    }, 1000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#21233d',
  },
  loadingText: {
    color: 'white',
  },
});

export default Splash;
