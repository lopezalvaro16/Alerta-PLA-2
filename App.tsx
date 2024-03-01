/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import AlertAddDetails from './app/screens/alert-add-details';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoginScreen from './app/screens/login-screen';
import HomeScreen from './app/screens/home-screen';
import RegisterScreen from './app/screens/register-screen';
import Splash from './app/screens/splash-screen';
import YourDrawerScreen from './app/screens/your-drawer-screen';
import AlertDetail from './app/screens/AlertDetail';
import Main from './app/screens/main-screen';
import EditarFotoPerfil from './app/screens/editar-foto-perfil';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar hidden barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#21233d',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white',
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: ''}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: ''}}
          />
          <Stack.Screen
            name="AlertAddDetail"
            component={AlertAddDetails}
            options={{title: 'Detalles'}}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{title: ''}}
          />
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="YourDrawerScreen"
            component={YourDrawerScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Main" component={Main} options={{title: ''}} />
          <Stack.Screen
            name="AlertConfirm"
            options={{headerShown: false}}
            component={AlertDetail}
          />
          <Stack.Screen
            name="EditarFotoPerfil"
            options={{headerShown: false}}
            component={EditarFotoPerfil}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
