import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MovimientosScreen = () => {
  const navigation = useNavigation();
  const handleAddDetails = () => {
    navigation.navigate('AlertAddDetail');
    setSelectedMovement(null);
  };
  const [movimientos] = useState([
    {
      tipo: 'Alerta de Robo',
      action: 'checkmark-circle',
      actionAdd: 'add-circle-outline',
      colorAction: 'green',
      fecha: '2023-11-14',
      hora: '12:30 PM',
      ubicacion:
        'Ubicación 1 que es bastante larga y puede ocupar varias líneas para probar cómo se maneja el texto largo en el diseño.',
    },
    {
      tipo: 'Alerta Vial',
      action: 'close-circle',
      actionAdd: 'add-circle-outline',
      colorAction: 'red',
      fecha: '2023-11-15',
      hora: '13:45 PM',
      ubicacion: 'Ubicación 2',
    },
    {
      tipo: 'V. de Género',
      action: 'time-outline',
      actionAdd: 'add-circle-outline',
      colorAction: 'orange',
      fecha: '2023-11-15',
      hora: '13:45 PM',
      ubicacion: 'Ubicación 2',
    },
  ]);

  const [selectedMovement, setSelectedMovement] = useState(null);

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
              <Text style={styles.tableCell}>{movimiento.tipo}</Text>
              <Text style={styles.tableCell}>{movimiento.hora}</Text>
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
              <Icon name="close" size={20} color="black" />
            </TouchableOpacity>
            <View style={styles.contentContenidoModal}>
              <Text style={styles.modalTitle}>Detalles del Movimiento</Text>
              <ScrollView style={styles.detailScrollView}>
                <Text style={[styles.detailText, {color: '#fff'}]}>
                  <Text style={{fontWeight: 'bold'}}>Tipo: </Text>
                  {selectedMovement?.tipo}
                </Text>
                <Text style={[styles.detailText, {color: '#fff'}]}>
                  <Text style={{fontWeight: 'bold'}}>Fecha: </Text>
                  {selectedMovement?.fecha}
                </Text>
                <Text style={[styles.detailText, {color: '#fff'}]}>
                  <Text style={{fontWeight: 'bold'}}>Hora: </Text>
                  {selectedMovement?.hora}
                </Text>
                <Text style={[styles.detailText, {color: '#fff'}]}>
                  <Text style={{fontWeight: 'bold'}}>Ubicación: </Text>
                  {selectedMovement?.ubicacion}
                </Text>
              </ScrollView>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddDetails}>
              <Text style={styles.buttonText}>Agregar detalles</Text>
            </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    backgroundColor: 'white',
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
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: '50%',
    minWidth: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'white',
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
    color: '#555',
    textAlign: 'justify',
    marginBottom: 10,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#725599',
    padding: 10,
    borderRadius: 10,
  },
  contentContenidoModal: {
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 1,
    // backgroundColor: "#fffcdc",
    backgroundColor: '#715899',
    padding: 15,
  },
});

export default MovimientosScreen;
