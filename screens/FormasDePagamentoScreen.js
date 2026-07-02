import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o conjunto de ícones Ionicons
import MenuHamburger from '../components/MenuHamburger';
import CenteredFooter from '../components/Footer';




const FormasDePagamento = ({ navigation }) => {

    return (
        <View style={styles.containerForm}>
            <MenuHamburger></MenuHamburger>
            <View style={styles.container}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 15}}>Minhas Formas de Pagamento</Text>
                <View style={styles.containerForma}>
                    <View style={styles.formaPagamento}>
                        <Icon name="cc-visa" size={25} color={'black'} />
                        <Text style={{fontSize: 15}}>Cartão de crédito</Text>
                    </View>
                    <View style={styles.formaPagamento}>
                        <Icon name="cc-mastercard" size={25} color={'black'} />
                        <Text style={{fontSize: 15}}>Cartão de debito</Text>
                    </View>
                    <View style={styles.formaPagamento}>
                        <Icon name="cc-paypal" size={25} color={'black'} />
                        <Text style={{fontSize: 20}}>Pix</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        zIndex: -1,
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        width: '100%',
        height:600,

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
        marginBottom: 35,
        marginTop: 140,
        width: '100%'
    },
    buttonText: {
        color: '#212529',
        fontSize: 18,
        textAlign: 'center'
    },
});
export default FormasDePagamento;