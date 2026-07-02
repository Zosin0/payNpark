import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import MenuHamburger from '../components/MenuHamburger';
import CenteredFooter from '../components/Footer';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Location from 'expo-location';

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [qrCode, setQrCode] = useState(null);
  const [vehicleLocation, setVehicleLocation] = useState(null);
  const [token, setToken] = useState(null);
  const [isQrCodeRead, setIsQrCodeRead] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setToken(token);
      } catch (error) {
        console.error('Erro ao carregar o token:', error);
      }
    };
    loadToken();


    if (route.params?.qrCode) {
      setQrCode(route.params.qrCode);
      setIsQrCodeRead(false);
    }
  }, [route.params?.qrCode]);

  const handleReadQrCode = () => {
    setIsQrCodeRead(true);
  };



  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://192.168.0.34:5000/api/v1/veiculo');
      setVehicles(response.data.vehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleViewLocation = () => {
    if (!vehicleLocation) {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permissão de localização negada');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setVehicleLocation(currentLocation);
      navigation.navigate('Map', { vehicleLocation: currentLocation });
    } catch (error) {
      console.error('Erro ao obter a localização:', error);
    }
  };


  const startParkingSession = async () => {
    const brazilDateTime = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    try {
      const response = await axios.post(
        'http://192.168.0.34:5000/api/v1/salvarQRCode',
        { brazilDateTime },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const data = response.data;
      if (data.success) {
        await AsyncStorage.setItem('token', response.data.qr_code);
        navigation.navigate('PayStep'); // Navega para a tela de estacionamento
      } else {
        console.error('Erro ao iniciar sessão:', data.message);
      }
    } catch (error) {
      console.error('Erro ao iniciar sessão:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MenuHamburger />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bem-vindo ao Park&Pay</Text>
        {!isQrCodeRead && qrCode && (
          <>
            <QRCode value={qrCode} size={150} style={styles.qrCode} />
            <TouchableOpacity style={styles.readButton} onPress={handleReadQrCode}>
              <Text style={styles.readButtonText}>Simular Leitura do QR Code</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.topBar}>
        <Text style={styles.headerText}>Você está no estacionamento { }</Text>
        <Icon name="map-marker" size={18} color="#000" />
      </View>
      <View style={styles.qrSection}>
        <TouchableOpacity style={styles.payButton} onPress={() => startParkingSession()}>
          <Text style={styles.payButtonText}>Criar Sessão</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.vehiclesSection}>
        <Text style={styles.vehiclesTitle}>Meus Carros</Text>
        {vehicles.map((vehicle) => (
          <View key={vehicle.id} style={styles.vehicleItem}>
            <Image style={styles.vehicleIcon} source={require('../assets/images/carro.png')} />
            <Text style={styles.vehicleText}>{vehicle.name} - {vehicle.placa}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.addVehicleButton} onPress={() => navigation.navigate('Veiculo')}>
          <Icon name="plus" size={24} color="#000" />
          <Text style={styles.addVehicleText}>Adicionar Carro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.partnersSection}>
        <Text style={styles.partnersTitle}>Estacionamentos Parceiros</Text>
        <TouchableOpacity style={styles.mapButton} onPress={() => navigation.navigate('Map')}>
          <Text style={styles.mapButtonText}>Ver no mapa</Text>
        </TouchableOpacity>
      </View>
      {/* <CenteredFooter /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 2,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  topBar: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  entryTimeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 12,
  },
  qrCode: {
    marginBottom: 16,
  },
  readButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  readButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  payButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  myCarsSection: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  myCarsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  myCarsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  manageText: {
    fontSize: 14,
    color: '#007BFF',
  },
  carsList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
  },
  carIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  carText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  carCheckIcon: {
    marginLeft: 'auto',
  },
  addCarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
  },
  addCarText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginLeft: 8,
  },
  partnersSection: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
  },
  partnersTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  mapButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  mapButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  vehiclesSection: {
    width: '100%',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 20,
  },
  vehiclesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 10,
  },
  vehicleIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  vehicleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  addVehicleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginTop: 10,
  },
  addVehicleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginLeft: 8,
  },

});

export default Home;
