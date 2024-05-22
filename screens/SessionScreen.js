import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Importa os ícones do FontAwesome
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const SessionScreen = ({ navigation, setIsUserLoggedIn }) => {
    const [sessionData, setSessionData] = useState(null);
    const [vehicleLocation, setVehicleLocation] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log(token)
                setToken(token);
            } catch (error) {
                console.error('Erro ao carregar o token:', error);
            }
        };
        loadToken();
    }, []);

    const startPayment = async () => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/v1/pagarEstacionamento',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const data = response.data;
            if (data.success) {
                navigation.navigate('PayStep')

            } else {
                console.error('Erro ao salvar QR Code:', data.message);
            }
        } catch (error) {
            console.error('Erro ao salvar QR Code:', error);
        }
    };

    const startParkingSession = async () => {
        const brazilDateTime = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
        setSessionData(brazilDateTime);
        console.log(token)
        try {
            const response = await axios.post(
                'http://localhost:5000/api/v1/salvarQRCode',
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
                console.log('QR Code salvo com sucesso:', data.message);
                navigation.navigate('HomeLoggedIn')
            } else {
                console.error('Erro ao salvar QR Code:', data.message);
            }


        } catch (error) {
            console.error('Erro ao salvar QR Code:', error);
        }
    };

    const handleViewLocation = () => {
        // Se a localização do veículo ainda não foi definida, define-a
        if (!vehicleLocation) {
            getCurrentLocation();
        }
        //else {
        //     navigation.navigate('Map', { vehicleLocation });
        // }
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


    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Sessão de Estacionamento</Text>

            {sessionData ? (
                <View style={styles.qrCodeContainer}>
                    <QRCode
                        value={sessionData}
                        size={250}
                    />
                </View>
            ) : (
                <>
                    {!token && (
                        <TouchableOpacity style={styles.button} onPress={startParkingSession}>
                            <FontAwesomeIcon name="car" size={20} color="white" style={styles.icon} />
                            <Text style={styles.buttonText}>Iniciar Sessão</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}

            <View style={styles.buttonContainer}>
                {token && (
                    <>
                         <TouchableOpacity style={styles.button} onPress={startParkingSession}>
                            <FontAwesomeIcon name="car" size={20} color="white" style={styles.icon} />
                            <Text style={styles.buttonText}>Iniciar Sessão</Text>
                        </TouchableOpacity>
                            
                        {/* <TouchableOpacity style={[styles.button, styles.yellowButton]} onPress={startPayment}>
                            <FontAwesomeIcon name="money" size={20} color="black" style={styles.icon} />
                            <Text style={styles.buttonText}>Pagar Estacionamento</Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity style={[styles.button, styles.blackButton]} onPress={handleViewLocation}>
                            <FontAwesomeIcon name="map-marker" size={20} color="white" style={styles.icon} />
                            <Text style={[styles.buttonText, { color: 'white' }]}>
                                {vehicleLocation ? 'Ver Localização do Carro' : 'Registrar Localização do Meu Veículo'}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
        width: 250,
    },
    yellowButton: {
        backgroundColor: '#FFD643',
    },
    blackButton: {
        backgroundColor: '#000',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
    },
    qrCodeContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
});

export default SessionScreen;