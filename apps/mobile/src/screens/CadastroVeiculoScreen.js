import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuHamburger from '../components/MenuHamburger';
import CenteredFooter from '../components/Footer';
import apiClient from '../api/client';

const CadastroVeiculoScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [placa, setPlaca] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await apiClient.post('/veiculo', {
                name, placa, marca, modelo, ano
            });
            if (response.data.success) {
                Alert.alert('Sucesso', 'Veículo cadastrado com sucesso');
                navigation.goBack();
            } else {
                Alert.alert('Erro', response.data.message);
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao cadastrar veículo');
        }
    };

    return (
        <View style={styles.containerForm}>
            <MenuHamburger />
            <View style={styles.container}>
                <View style={styles.head}>
                    <Icon name="car" size={35} color={'#FFD643'} />
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Cadastrar Carro</Text>
                </View>
                <Text>Apelido</Text>
                <TextInput style={styles.input} placeholder="apelido" value={name} onChangeText={setName} />
                <Text> Placa </Text>
                <TextInput style={styles.input} placeholder='XXXXXXX' value={placa} onChangeText={setPlaca} />
                <View style={styles.containerValidade}>
                    <View style={styles.box}>
                        <Text> Marca </Text>
                        <TextInput style={styles.inputDiferente} placeholder='XXXXXXXX' value={marca} onChangeText={setMarca} />
                    </View>
                    <View style={styles.box}>
                        <Text> Modelo </Text>
                        <TextInput style={styles.inputDiferente} placeholder='***' value={modelo} onChangeText={setModelo} />
                    </View>
                </View>
                <Text> Ano </Text>
                <TextInput style={styles.input} placeholder='YYYY' value={ano} onChangeText={setAno} />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
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
        top: -150,
        backgroundColor: '#E2E6EE',
        padding: 15,
        borderRadius: 20,
        width: 300,
        elevation: 5,
        marginBottom: -35
    },
    head: {
        alignItems: 'center',
        marginBottom: 20
    },
    input: {
        width: 250,
        marginBottom: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: '#BCC3D1',
    },
    containerValidade: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 250
    },
    box: {
        justifyContent: 'center',
    },
    inputDiferente: {
        width: 120,
        marginBottom: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: '#BCC3D1',
    },
    button: {
        backgroundColor: '#FCE77B',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 25,
        marginTop: 10,
        width: '100%'
    },
    buttonText: {
        color: '#212529',
        fontSize: 18,
        textAlign: 'center'
    },
});
export default CadastroVeiculoScreen;
