import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const CenteredFooter = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.leftButton} onPress={() => navigation.navigate('Pagamento')}>
                <Icon name="credit-card" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.centerButton} onPress={() => navigation.navigate('HomeLoggedIn')}>
                <Icon name="home" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButton} onPress={() => navigation.navigate('Veiculo')}>
                <Icons name='car' size={25} color="#fff"/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 56,
    },
    leftButton: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#555',
    },
    centerButton: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#555',
    },
    rightButton: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#555',
    },
    buttonText: {
        color: '#fff',
    },
});

export default CenteredFooter;