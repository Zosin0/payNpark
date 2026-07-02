import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o conjunto de ícones Ionicons
import MenuHamburger from '../components/MenuHamburger';
import CenteredFooter from '../components/Footer';




const SessaoEstacionamentoQrCode = ({ navigation }) => {

    return (
        <View style={styles.containerForm}>
            <MenuHamburger></MenuHamburger>
            <View style={styles.container}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                <View style={styles.containerForma}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center', marginTop: 20 }}>Resumo da sua estadia</Text>
                    <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 70 }}>Valor a ser pago: R$15,00</Text>
                    <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 50 }}>Tempo de permanencia: 3 minutos </Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Veiculo')}>
                        <Icon name="map-marker" size={25} color="#000" style={{alignContent: 'center'}}/>
                        <Text style={styles.buttonText}>Registrar Localização do meu Veiculo</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        zIndex: -1,
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        width: '100%',
        height: 600,

        alignItems: 'center'
    },
    containerForma: {
        height: 480,
        width: 300,
    },
    formaPagamento: {
        flex: 1,
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: 'center',
        margin: 5,
        backgroundColor: '#9f9f9f',
        borderRadius: 5,
        marginTop: 40,
        width: 200,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#FCE77B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 100,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonText: {
        color: '#212529',
        fontSize: 13,
        alignContent: 'center',  
        marginLeft: 30,
    },
});
export default SessaoEstacionamentoQrCode;