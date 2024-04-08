import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  Appearance,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFirebase} from '../context/firebase-context';

const UserSettingsScreen = () => {
  const [firstName, setFirstName] = useState('Alvaro');
  const [lastName, setLastName] = useState('Apellido');
  const [address, setAddress] = useState('Calle');
  const [email, setEmail] = useState('usuario@gmail.com');

  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [profileData, setProfileData] = useState(null);
  const {FIREBASE_AUTH, FIRESTORE_DB} = useFirebase();

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;
        const response = await FIRESTORE_DB.collection('users')
          .where('uid', '==', currentUser.uid)
          .get();
        const userData = response._docs[0]._data;
        const displayName = userData.nombre;
        const lastName = userData.apellido;
        const phoneNumber = userData.phone;
        const photoURL = userData.photoURL;
        const dniUser = userData.dni;
        setProfileData({
          email: currentUser.email,
          displayName: displayName || 'No verificado',
          lastName: lastName || 'No verificado',
          photoURL: photoURL,
          phoneNumber: phoneNumber || '--- ---',
          dniUser: dniUser || '--- ---',
        });
      } catch (error) {
        console.error('Error al cargar datos:', error.message, error.stack);
      }
    };
    fetchData();
  }, [FIREBASE_AUTH, FIRESTORE_DB]);

  const handleSaveChanges = () => {
    setIsEditingFirstName(false);
    setIsEditingLastName(false);
    setIsEditingAddress(false);
    setIsEditingEmail(false);
  };

  // Función para capitalizar la primera letra de cada palabra en una cadena
  const capitalizeFirstLetter = str => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.containerScroll,
        {backgroundColor: isDarkMode ? '#000' : '#CcdcEC'},
      ]}>
      <View style={styles.container}>
        <Text style={[styles.label, {color: isDarkMode ? '#fff' : '#000'}]}>
          Nombre:
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                color: isDarkMode ? '#fff' : '#000',
                borderColor: isDarkMode ? '#fff' : 'gray',
              },
            ]}
            value={
              profileData ? capitalizeFirstLetter(profileData.displayName) : ''
            }
            onChangeText={text => setFirstName(text)}
            placeholder={
              profileData ? capitalizeFirstLetter(profileData.displayName) : ''
            }
            editable={isEditingFirstName}
          />

          {isEditingFirstName ? (
            <TouchableOpacity
              onPress={handleSaveChanges}
              style={styles.editButton}>
              <Ionicons name="checkmark" size={20} color="#6600ff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditingFirstName(true)}
              style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={[styles.label, {color: isDarkMode ? '#fff' : '#000'}]}>
          Apellido:
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                color: isDarkMode ? '#fff' : '#000',
                borderColor: isDarkMode ? '#fff' : 'gray',
              },
            ]}
            value={
              profileData ? capitalizeFirstLetter(profileData.lastName) : ''
            }
            onChangeText={text => setLastName(text)}
            placeholder="Apellido"
            editable={isEditingLastName}
          />
          {isEditingLastName ? (
            <TouchableOpacity
              onPress={handleSaveChanges}
              style={styles.editButton}>
              <Ionicons name="checkmark" size={20} color="#6600ff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditingLastName(true)}
              style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={[styles.label, {color: isDarkMode ? '#fff' : '#000'}]}>
          Numero:
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                color: isDarkMode ? '#fff' : '#000',
                borderColor: isDarkMode ? '#fff' : 'gray',
              },
            ]}
            value={
              profileData ? capitalizeFirstLetter(profileData.phoneNumber) : ''
            }
            onChangeText={text => setAddress(text)}
            placeholder={
              profileData ? capitalizeFirstLetter(profileData.phoneNumber) : ''
            }
            editable={isEditingAddress}
          />
          {isEditingAddress ? (
            <TouchableOpacity
              onPress={handleSaveChanges}
              style={styles.editButton}>
              <Ionicons name="checkmark" size={20} color="#6600ff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditingAddress(true)}
              style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={[styles.label, {color: isDarkMode ? '#fff' : '#000'}]}>
          Correo Electrónico:
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                color: isDarkMode ? '#fff' : '#000',
                borderColor: isDarkMode ? '#fff' : 'gray',
              },
            ]}
            value={profileData ? profileData.email : ''}
            onChangeText={text => setEmail(text)}
            placeholder={profileData ? profileData.email : ''}
            editable={isEditingEmail}
          />
          {isEditingEmail ? (
            <TouchableOpacity
              onPress={handleSaveChanges}
              style={styles.editButton}>
              <Ionicons name="checkmark" size={20} color="#6600ff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditingEmail(true)}
              style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={handleSaveChanges}
          style={[
            styles.saveButton,
            {backgroundColor: isDarkMode ? '#6600ff' : '#725599'},
          ]}>
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  containerScroll: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    overflow: 'hidden',
    height: '100%',
    margin: 25,
    padding: 30,
    shadowColor: '#000',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    width: 150,
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  editButton: {
    marginLeft: 10,
  },
  editButtonText: {
    color: '#725599',
  },
  saveButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserSettingsScreen;
