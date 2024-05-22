import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios'; // Importe axios para fazer solicitações HTTP
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaySteps = ({ navigation }) => {
    const [valorAPagar, setValorAPagar] = useState(0);
    const [tempoPermanencia, setTempoPermanencia] = useState(0);

    useEffect(() => {
        // Função para buscar dados do backend ao carregar a tela
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
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
                    setValorAPagar(data.valor);
                    setTempoPermanencia(data.tempo);
                } else {
                    console.error('Erro ao obter dados do backend:', data.message);
                }
            } catch (error) {
                console.error('Erro ao obter dados do backend:', error);
            }
        };
        fetchData(); // Chamar a função de busca de dados ao carregar a tela
    }, []);

    const finalizarPagamento = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/v1/pagarEstacionamento',
                { valor: valorAPagar },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        
            const data = response.data;
            if (data.success) {
                AsyncStorage.setItem('token', response.data.token);
                console.log(AsyncStorage.getItem('token'));
                console.log("É FACIL FABRICAR PAPEL")
                navigation.navigate('HomeLoggedIn');
            } else {
                console.error('Erro 1231:', data.message);
            }
        } catch (error) {
            console.error('Erro 789456:', error);
        }
    };
    
 
    // Logic to transform tempoPermanencia in hours if it exceeds 60 minutes
    let formattedTempoPermanencia = tempoPermanencia;
    if (formattedTempoPermanencia > 60) {
        const hours = Math.floor(formattedTempoPermanencia / 60);
        const minutes = formattedTempoPermanencia % 60;
        formattedTempoPermanencia = `${hours} horas`;
    } else {
        formattedTempoPermanencia = `${formattedTempoPermanencia} minutos`;
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Fluxo de Pagar</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Valor a ser pago: R$ {valorAPagar}</Text>

                <Text style={styles.infoText}>Tempo de permanência: {formattedTempoPermanencia}</Text>

            </View>

            <TouchableOpacity style={styles.button} onPress={finalizarPagamento}>
                <Text style={styles.buttonText}>Finalizar Pagamento</Text>
            </TouchableOpacity>
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
    infoContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PaySteps;