import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserSettingsScreen = () => {
  const [firstName, setFirstName] = useState('Alvaro');
  const [lastName, setLastName] = useState('Apellido');
  const [adress, setAdress] = useState('Calle');
  const [email, setEmail] = useState('usuario@gmail.com');

  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const handleSaveChanges = () => {
    setIsEditingFirstName(false);
    setIsEditingLastName(false);
    setIsEditingAddress(false);
    setIsEditingEmail(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <View style={styles.container}>
        <Text style={styles.label}>Nombre:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={text => setFirstName(text)}
            placeholder="Nombre"
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
              {/* <Ionicons name="create" size={20} color="#725599" /> */}
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.label}>Apellido:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={lastName}
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
              {/* <Ionicons name="create" size={20} color="#725599" /> */}
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.label}>Dirección:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={adress}
            onChangeText={text => setAdress(text)}
            placeholder="Nombre"
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
              {/* <Ionicons name="create" size={20} color="#725599" /> */}
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.label}>Correo Electrónico:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="Nombre"
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
              {/* <Ionicons name="create" size={20} color="#725599" /> */}
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  containerScroll: {
    flex: 1,
    backgroundColor: '#CcdcEC',
  },
  container: {
    flex: 1,
    overflow: 'hidden',
    height: '100%',
    backgroundColor: '#f0f0f0',
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
    borderBottomColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  editButton: {
    fontSize: 18,
    marginLeft: 10,
    color: '#725599',
  },
  saveButton: {
    backgroundColor: '#6600ff',
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
