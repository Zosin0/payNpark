import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Entypo } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const MenuHamburger = () => {
    const navigation = useNavigation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            setIsMenuOpen(false);
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView style={styles.containerMenu}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                    <Entypo
                        name={isMenuOpen ? 'cross' : 'menu'}
                        size={30}
                        color={'#FFD643'}
                    />
                </TouchableOpacity>
            </View>
            {isMenuOpen && (
                <View style={styles.menuItems}>
                    <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('HomeLoggedIn')}>
                        <Icon name="home" size={20} color={'#FFD643'} />
                        <Text style={styles.menuItemText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Pagamento')}>
                        <Icon name="wallet" size={20} color={'#FFD643'} />
                        <Text style={styles.menuItemText}>Cadastrar formas de pagamento</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Veiculo')}>
                        <Icon name="traffic-cone" size={20} color={'#FFD643'} />
                        <Text style={styles.menuItemText}>Cadastrar veículo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Icon name="unread" size={20} color={'#FFD643'} />
                        <Text style={styles.menuItemText}>Histórico de estacionamento</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Icon name="users" size={20} color={'#FFD643'} />
                        <Text style={styles.menuItemText}>Meus perfis</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Logout')}>
                        <Icon name="cross" size={20} color={'#FFD643'} />
                        <Text style={styles.menuItemText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logo: {
        position: 'absolute',
        top: -50,
        left: 150,
        width: 80,
        height: 50,
    },
    containerMenu: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 37,
    },
    header: {
        flex: 1,
        position: 'absolute',
        height: 60,
        left: -190,
        width: 250
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
    },
    menuButton: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
    menuIcon: {
        fontSize: 30,
        color: '#fff',
    },
    menuItems: {
        position: 'absolute',
        left: -190,
        top: 50,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        width: 250,
        height: 800,
        backgroundColor: 'white',
    },
    menuItem: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        marginVertical: 3,
        left: 20,
    },
    menuItemText: {
        fontSize: 13,
        left: 15
    },
});


export default MenuHamburger;