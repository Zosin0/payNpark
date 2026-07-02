import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import MenuHamburger from './MenuHamburger';
import CenteredFooter from './Footer';


export default function Code() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Escanear')

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    }

    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText('informação do Qrcode: \n\n' + data)
        console.log('Type: ' + type + '\nData: ' + data)
    };

    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Precisa da permissão </Text>
            </View>)
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>Sem acesso a camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>)
    }

    // Return the View
    return (
        <View style={styles.container}>
            <MenuHamburger />
            <View style={{ zIndex: -1, top: -130, textAlign: 'center', alignItems: 'center'}}>
                <View style={styles.barcodebox}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={{ height: 400, width: 400}} />
                </View>
                <Text style={styles.maintext}>{text}</Text>

                {scanned && <TouchableOpacity style={styles.buttons} onPress={() => setScanned(false)}>
                    <Text style={styles.reset}>Ler novo QrCode</Text>
                </TouchableOpacity>}
            </View>
            <CenteredFooter />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    maintext: {
        textAlign: 'center',
        fontSize: 16,
        margin: 20,
        backgroundColor: '#DDD',
        padding: 20
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato',
    },
    buttons: {
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#666',
        padding: 20,
        borderRadius: 10,
        top: 90

    }
});