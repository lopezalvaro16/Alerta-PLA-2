import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import AlertAddDetails from './app/screens/alert-add-details.jsx';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoginScreen from './app/screens/login-screen.jsx';
import HomeScreen from './app/screens/home-screen.jsx';
import RegisterScreen from './app/screens/register-screen.jsx';
import Splash from './app/screens/splash-screen.jsx';
import YourDrawerScreen from './app/screens/your-drawer-screen.jsx';
import AlertDetail from './app/screens/alert-detail.jsx';
import Main from './app/screens/main-screen.jsx';
import EditarFotoPerfil from './app/screens/editar-foto-perfil.jsx';
import {AuthProvider} from './app/context/auth/auth-context.jsx';
import {AlertProvider} from './app/context/AlertContext.jsx';
import {SocketProvider} from './app/context/SocketContext.jsx';
import TipsView from './app/screens/tips-alert-screen.jsx';
import MailValidation from './app/screens/mail-validation.jsx';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AlertProvider>
          <SocketProvider>
            <StatusBar hidden barStyle="light-content" />
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={'Home'}
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
                <Stack.Screen
                  name="Main"
                  component={Main}
                  options={{title: ''}}
                />
                <Stack.Screen
                  name="AlertConfirm"
                  options={{headerShown: false}}
                  component={AlertDetail}
                />
                <Stack.Screen
                  name="EditarFotoPerfil"
                  options={{title: ''}}
                  component={EditarFotoPerfil}
                />
                <Stack.Screen
                  name="TipsAlert"
                  component={TipsView}
                  options={{title: ''}}
                />
                <Stack.Screen
                  name="MailValidation"
                  component={MailValidation}
                  options={{title: ''}}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SocketProvider>
        </AlertProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
