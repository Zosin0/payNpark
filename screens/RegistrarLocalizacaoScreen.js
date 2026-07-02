import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o conjunto de ícones Ionicons
import MenuHamburger from '../components/MenuHamburger';
import CenteredFooter from '../components/Footer';
import MapView from 'react-native-maps';


const RegistrarLocalizacao = ({ navigation }) => {

    return (
        <View style={styles.containerForm}>
            <MenuHamburger></MenuHamburger>
            <View style={styles.container}>
                <MapView style={styles.map} />
                <View style={styles.texto}>
                    <Text style={styles.titulo}>LOCALIZAR VEICULO</Text>
                    <Text>Selecionar VEICULO</Text>
                    <View style={styles.containerCar}>
                        <View style={styles.containerImage}>
                            <Image source={require('../assets/images/carro.png')}></Image>
                            <Text>Apelido Carro</Text>
                        </View>
                        <View style={styles.containerImage}>
                            <Image source={require('../assets/images/carro.png')}></Image>
                            <Text>Apelido Carro</Text>
                        </View>
                    </View>
                    <View>
                        <Text>Localização do veículo</Text>
                        <Text>2972 Westheimer Rd. Santa Ana, Illinois 85486 </Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pagamento')}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <CenteredFooter />
        </View>
    );
}

const styles = StyleSheet.create({
    containerForm: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        zIndex: -1,
        top: 0,
        backgroundColor: '#E2E6EE',
        borderRadius: 20,
        width: '100%',
        elevation: 5,
        alignItems: 'center'
    },
    texto: {
        marginTop: 20,
        width: 300,
        justifyContent: 'center',
        alignContent: 'center',
    },
    map: {
        width: '100%',
        height: '51%',
    },
    containerCar: {
        width: 150,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    containerImage:{
        margin: 3,
        alignItems: 'center',
        marginBottom: 20
    },
    titulo:{
        fontWeight: 'bold',
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#FCE77B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: -50,
        marginTop: 30,
        width: '100%'
    },
    buttonText: {
        color: '#212529',
        fontSize: 18,
        textAlign: 'center'
    }
});
export default RegistrarLocalizacao;