import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  collection,
  getDocs,
  query,
  where,
} from '@react-native-firebase/firestore';
import {useFirebase} from '../context/firebase-context';
import {GOOGLE_API_KEY} from '../constants/api-constans';

const MovimientosScreen = () => {
  const navigation = useNavigation();
  const {FIRESTORE_DB, FIREBASE_AUTH} = useFirebase();
  const [movimientos, setMovimientos] = useState([]);
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [userLocation, setUserLocation] = useState('');

  const userId = FIREBASE_AUTH.currentUser.uid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(FIRESTORE_DB, 'alerts'),
          where('userId', '==', userId),
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => doc.data());
        setMovimientos(data);
        if (data.length > 0) {
          const lastMovement = data[data.length - 1];
          const latitude = lastMovement.latitude;
          const longitude = lastMovement.longitude;
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`,
          );
          const responseData = await response.json();
          if (responseData.status === 'OK' && responseData.results.length > 0) {
            const address = responseData.results[0].formatted_address;
            console.log('Ubicación completa:', address);
            setUserLocation(address);
          } else {
            console.error('No se pudo obtener la ubicación.');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [FIRESTORE_DB, userId]);

  const handleAddDetails = () => {
    navigation.navigate('AlertAddDetail');
    setSelectedMovement(null);
  };

  const handleMovementPress = movement => {
    setSelectedMovement(movement);
  };

  const handleExit = () => {
    setSelectedMovement(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView
          style={styles.tableContainer}
          contentContainerStyle={styles.tableContent}>
          <View style={styles.tableRowData}>
            <Text style={styles.tableHeader}>Tipo</Text>
            <Text style={styles.tableHeader}>Hora</Text>
          </View>
          {movimientos.map((movimiento, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={styles.tableRow}
              onPress={() => handleMovementPress(movimiento)}>
              <Text style={styles.tableCell}>{movimiento.alertType}</Text>
              <Text style={styles.tableCell}>{movimiento.hour}</Text>
              <Icon
                name={movimiento.action}
                size={40}
                color={movimiento.colorAction}
              />
              {movimiento.action === 'checkmark-circle' && (
                <Icon
                  name={movimiento.actionAdd}
                  size={40}
                  color={movimiento.colorAction}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Modal
        visible={selectedMovement !== null}
        animationType="slide"
        transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleExit}>
              <Icon name="close" size={20} color="gray" />
            </TouchableOpacity>
            <View style={styles.contentContenidoModal}>
              <Text style={styles.modalTitle}>Detalles del Movimiento</Text>
              <ScrollView style={styles.detailScrollView}>
                <Text style={[styles.detailText, {color: 'black'}]}>
                  <Text style={{fontWeight: 'bold'}}>Tipo: </Text>
                  {selectedMovement?.alertType}
                </Text>
                <Text style={[styles.detailText, {color: 'black'}]}>
                  <Text style={{fontWeight: 'bold'}}>Fecha: </Text>
                  {selectedMovement?.date}
                </Text>
                <Text style={[styles.detailText, {color: 'black'}]}>
                  <Text style={{fontWeight: 'bold'}}>Hora: </Text>
                  {selectedMovement?.hour}
                </Text>
                <Text style={[styles.detailText, {color: 'black'}]}>
                  <Text style={{fontWeight: 'bold'}}>Ubicación: </Text>
                  {userLocation}
                </Text>
              </ScrollView>
            </View>
            {/* <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddDetails}>
              <Text style={styles.buttonText}>Agregar detalles</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CcdcEC',
  },
  content: {
    padding: 20,
    flex: 1,
  },
  tableContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableContent: {
    flexGrow: 1,
  },
  tableRowData: {
    flexDirection: 'row',
  },
  tableRow: {
    flexDirection: 'row',
    margin: 10,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
  },
  tableHeader: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  tableCell: {
    fontSize: 16,
    flex: 1,
    padding: 10,
    textAlign: 'center',
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#CcdcEC',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: '50%',
    minWidth: '90%',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black',
  },
  closeButton: {
    padding: 10,
    borderRadius: 10,
    position: 'relative',
    top: -10,
    right: -160,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  detailScrollView: {
    marginBottom: 15,
    maxHeight: 150,
  },

  detailText: {
    color: 'black',
    textAlign: 'justify',
    marginBottom: 10,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#aaaccc',
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
  },
  contentContenidoModal: {
    // borderColor: 'black',
    // borderRadius: 15,
    // borderWidth: 1,
    // backgroundColor: '#aaaccc',
    padding: 15,
  },
});

export default MovimientosScreen;
