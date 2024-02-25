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

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar hidden barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AlertAddDetail"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#21233d',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white',
          }}>
          {/* <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="YourDrawerScreen"
          component={YourDrawerScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterName"
          component={RegisterName}
          options={{title: ''}}
        />
        <Stack.Screen
          name="MailValidation"
          component={MailValidation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterUbi"
          component={RegisterUbi}
          options={{title: 'Ubicación'}}
        />
        <Stack.Screen name="EditarFotoPerfil" component={EditarFotoPerfil} />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{title: 'Perfil'}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{title: ''}}
        />
        <Stack.Screen name="Main" component={Main} options={{title: 'Menu'}} />
        <Stack.Screen
          name="Movements"
          component={MovimientosScreen}
          options={{title: ''}}
        />

        <Stack.Screen
          name="Config"
          component={UserSettingsScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="AlertConfirm"
          component={AlertDetail}
          options={{headerShown: false}}
        /> */}
          <Stack.Screen
            name="AlertAddDetail"
            component={AlertAddDetails}
            options={{title: 'Detalles'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
