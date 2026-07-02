import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import MenuHamburger from './MenuHamburger';
import CenteredFooter from './Footer';


export default function Code() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Escanear')

    const handleBarcodeScanned = ({ type, data }) => {
        setScanned(true);
        setText('informação do Qrcode: \n\n' + data)
        console.log('Type: ' + type + '\nData: ' + data)
    };

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text>Precisa da permissão </Text>
            </View>)
    }
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>Sem acesso a camera</Text>
                <Button title={'Allow Camera'} onPress={requestPermission} />
            </View>)
    }

    return (
        <View style={styles.container}>
            <MenuHamburger />
            <View style={{ zIndex: -1, top: -130, textAlign: 'center', alignItems: 'center'}}>
                <View style={styles.barcodebox}>
                    <CameraView
                        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
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