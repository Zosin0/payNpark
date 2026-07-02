import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import MenuHamburger from '../components/MenuHamburger';
import CenteredFooter from '../components/Footer';
import apiClient from '../api/client';
import { useAuth } from '../context/AuthContext';

const SessionScreen = ({ navigation }) => {
    const { login } = useAuth();
    const [vehicleLocation, setVehicleLocation] = useState(null);

    const startParkingSession = async () => {
        const brazilDateTime = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
        try {
            const response = await apiClient.post('/parking/sessions', { brazilDateTime });
            const data = response.data;
            if (data.success) {
                await login(data.token);
                navigation.navigate('PayStep');
            } else {
                console.error('Erro ao iniciar sessão:', data.message);
            }
        } catch (error) {
            console.error('Erro ao iniciar sessão:', error);
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

    return (
        <View style={styles.container}>
            <MenuHamburger />
            <View style={styles.content}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Sessão de Estacionamento</Text>
                <TouchableOpacity style={styles.buttonBlack} onPress={startParkingSession}>
                    <FontAwesomeIcon name="car" size={20} color="white" style={styles.icon} />
                    <Text style={styles.buttonTextBlack}>Iniciar Sessão</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.buttonYellow} onPress={() => navigation.navigate('Pay')}>
                    <FontAwesomeIcon name="credit-card" size={20} color="black" style={styles.icon} />
                    <Text style={styles.buttonTextYellow}>Pagar Estacionamento</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonYellow} onPress={handleViewLocation}>
                    <FontAwesomeIcon name="map-marker" size={20} color="black" style={styles.icon} />
                    <Text style={styles.buttonTextYellow}>Registrar Localização do Meu Veículo</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        width: '100%',
        height: 600,
        alignItems: 'center'
},
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonBlack: {
        backgroundColor: '#000000',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '100%',
        marginBottom: 10,
    },
    buttonTextBlack: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    buttonYellow: {
        backgroundColor: '#FFD700',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '100%',
        marginBottom: 10,
    },
    buttonTextYellow: {
        color: 'black',
        fontSize: 16,
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
});

export default SessionScreen;


// const styles = StyleSheet.create({
//     logo: {
//         width: 150,
//         height: 150,
//         resizeMode: 'contain',
//         marginBottom: 50,
//     },
//     container: {
//         backgroundColor: '#EEEEEE',
//         borderRadius: 20,
//         width: '100%',
//         height: 600,
//         alignItems: 'center'
//     },
//     containerForma: {
//         height: 480,
//         width: 300,
//     },
//     buttonBlack: {
//         backgroundColor: 'black',
//         color: 'white',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//         marginTop: 50,
//         width: '100%',
//         flexDirection: 'row'
//     },
//     buttonTextBlack: {
//         color: 'white',
//         fontSize: 20,
//         alignContent: 'center',
//         marginLeft: 50
//     },
// });

// export default SessionScreen;
