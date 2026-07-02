import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import apiClient from '../api/client';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [vehicleLocation, setVehicleLocation] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [estacionamentos, setEstacionamentos] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      const storedVehicleLocation = await AsyncStorage.getItem('vehicleLocation');
      if (storedVehicleLocation) {
        setVehicleLocation(JSON.parse(storedVehicleLocation));
      }

      fetchVehicles();
      fetchEstacionamentos();
    })();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await apiClient.get('/vehicles');
      setVehicles(response.data.vehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const fetchEstacionamentos = async () => {
    try {
      const response = await apiClient.get('/parking/lots');
      setEstacionamentos(response.data);
    } catch (error) {
      console.error('Error fetching estacionamentos:', error);
    }
  };

  const addVehicleLocation = async () => {
    if (selectedVehicle && location) {
      const newVehicleLocation = {
        ...location,
        vehicleId: selectedVehicle.id,
      };
      setVehicleLocation(newVehicleLocation);
      await AsyncStorage.setItem('vehicleLocation', JSON.stringify(newVehicleLocation));
    }
  };

  const generateMapHTML = (latitude, longitude, vehicleLatitude, vehicleLongitude, estacionamentos) => {
    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
    const estacionamentosMarkers = estacionamentos.map(estacionamento => `
      var marker = new google.maps.Marker({
        position: {lat: ${estacionamento.latitude}, lng: ${estacionamento.longitude}},
        map: map,
        icon: 'https://lh3.googleusercontent.com/pw/AP1GczPGH226FDKzkZ9GX5JBX-usaAOeFjR4G36xpFc_-rvGipnmni_tauC8vRYl_i9TMRAGPdBLpXMkr0UeieVlXjz8eaCFE7svrZxdgV7_p5gme7fQer8FK03X8v8MDZjN6U-9QKCHPwA6uw3JGzOMx91IBA=w90-h90-s-no-gm?authuser=0', 
        title: '${estacionamento.nome}'
      });
    `).join('');

    return `
      <html>
      <head>
        <style type="text/css">
          body, html, #map { height: 100%; margin: 0; padding: 0; }
          #map { height: 80%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          function initMap() {
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 15,
              center: {lat: ${latitude}, lng: ${longitude}}
            });

            var marker = new google.maps.Marker({
              position: {lat: ${latitude}, lng: ${longitude}},
              map: map,
              title: 'Sua localização'
            });

            ${vehicleLatitude && vehicleLongitude ? `
              var vehicleMarker = new google.maps.Marker({
                position: {lat: ${vehicleLatitude}, lng: ${vehicleLongitude}},
                map: map,
                icon: 'https://lh3.googleusercontent.com/pw/AP1GczPtKbso13E09FWcTqzfqjobJacbazZWHnlK5hDPd4UJMJyP-4BkdprkWF_USaWNlfe_3vih3EKjAs3JzN1w70xQYJWsjgbNI2XCyXWUp3x7Mp8E_PuC2Ghu2Epvu-undl2JqT6gBvs55f_DztBNd-XMPQ=w121-h89-s-no-gm?authuser=0', 
                title: 'Localização do veículo'
              });
            ` : ''}

            ${estacionamentosMarkers}
          }
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap" async defer></script>
      </body>
      </html>
    `;
  };

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        style={styles.webview}
        source={{ html: generateMapHTML(location?.latitude, location?.longitude, vehicleLocation?.latitude, vehicleLocation?.longitude, estacionamentos) }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.header}>Registrar Localização</Text>
        <ScrollView
          horizontal
          style={styles.vehicleSelector}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {vehicles.map(vehicle => (
            <TouchableOpacity key={vehicle.id} onPress={() => setSelectedVehicle(vehicle)} style={styles.vehicleItem}>
              <Image source={require('../../assets/images/carro.png')} style={styles.vehicleIcon} />
              <Text style={styles.vehicleName}>{vehicle.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={styles.locationText}>Localização do veículo</Text>
        <Text style={styles.locationAddress}>
          {vehicleLocation ? `${vehicleLocation.latitude}, ${vehicleLocation.longitude}` : 'Nenhuma localização registrada'}
        </Text>
        <TouchableOpacity style={styles.registerButton} onPress={addVehicleLocation}>
          <Icon name="map-marker" size={20} color="#000" />
          <Text style={styles.registerButtonText}>Registrar Localização Veículo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width: Dimensions.get('window').width,
    height: '60%',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  vehicleSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  vehicleItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  vehicleIcon: {
    width: 50,
    height: 50,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    color: '#000',
  },
});

export default MapScreen;
