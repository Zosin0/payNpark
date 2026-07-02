import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MenuHamburger from '../components/MenuHamburger';
import CenteredFooter from '../components/Footer';

// Cadastro de cartao de credito ainda nao esta implementado. O fluxo
// anterior desta tela coletava PAN/CVV em um formulario cru e nunca
// enviava esses dados a lugar nenhum - so descartava o estado ao sair
// da tela. Dado de cartao nunca deve trafegar pelo backend proprio ou
// ficar em estado React sem uma integracao real de tokenizacao (ex:
// Checkout Pro/Bricks do Mercado Pago via WebView/SDK oficial), entao
// por enquanto esta tela e apenas um placeholder ate essa integracao
// existir de fato.
const CadastroPagamentoScreen = ({ navigation }) => {
    return (
        <View style={styles.containerForm}>
            <MenuHamburger />
            <View style={styles.container}>
                <View style={styles.head}>
                    <Icon name="credit-card" size={55} color={'#FFD643'} />
                    <Text style={styles.title}>Formas de pagamento</Text>
                </View>
                <Text style={styles.message}>
                    O cadastro de cartao esta em desenvolvimento. Em breve voce podera
                    adicionar um cartao com checkout seguro (tokenizado) via Mercado
                    Pago, sem que os dados do cartao passem pelo nosso backend.
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
            <CenteredFooter />
        </View>
    );
};

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
        top: -110,
        backgroundColor: '#E2E6EE',
        padding: 20,
        borderRadius: 20,
        width: 300,
        elevation: 5,
        marginBottom: -45,
        alignItems: 'center',
    },
    head: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
    },
    message: {
        fontSize: 14,
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#FCE77B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '100%',
    },
    buttonText: {
        color: '#212529',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default CadastroPagamentoScreen;
