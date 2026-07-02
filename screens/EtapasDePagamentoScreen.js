import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import apiClient from '../src/api/client';

const PaySteps = () => {
  const [valorAPagar, setValorAPagar] = useState(0);
  const [tempoPermanencia, setTempoPermanencia] = useState(0);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/pagarEstacionamento');
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
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTempoPermanencia(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const finalizarPagamento = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post('/pagarEstacionamento', { valor: valorAPagar });

      const data = response.data;
      if (data.success) {
        setPaymentUrl(data.payment_url);
      } else {
        console.error('Erro ao finalizar pagamento:', data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error('Erro ao finalizar pagamento:', error);
      setLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    try {
      const response = await apiClient.get('/pagamentoConfirmado');
      const data = response.data;
      if (data.success) {
        setQrCodeData(data.qr_code);
        //setShowQRCode(true);
        setLoading(false);
        navigation.navigate('HomeLoggedIn', { qrCode: data.qr_code }); // Navega para a tela inicial com o QR code
      }
    } catch (error) {
      console.error('Erro ao verificar status do pagamento:', error);
      setLoading(false);
    }
  };

  const handleNavigationStateChange = (navState) => {
    if (navState.url.includes('pagamentoConfirmado')) {
      setPaymentUrl(null);
      checkPaymentStatus();
    } else if (navState.url === 'about:blank' || navState.url === 'about:srcdoc') {
      setPaymentUrl(null);
    }
  };

  const formattedTempoPermanencia = `${Math.floor(tempoPermanencia / 60)}:${(tempoPermanencia % 60).toString().padStart(2, '0')} minutos`;

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Fluxo de Pagamento</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Valor a ser pago: R$ {valorAPagar}</Text>
        <Text style={styles.infoText}>Tempo de permanência: {formattedTempoPermanencia}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Map')}>
        <Text style={styles.buttonText}>Ver Localização do Carro</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={finalizarPagamento} disabled={loading}>
        <Text style={styles.buttonText}>Finalizar Estacionamento</Text>
        {loading && <ActivityIndicator size="small" color="#fff" />}
      </TouchableOpacity>
      {paymentUrl && (
        <Modal visible onRequestClose={() => setPaymentUrl(null)}>
          <WebView
            source={{ uri: paymentUrl }}
            onNavigationStateChange={handleNavigationStateChange}
            startInLoadingState
            renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
          />
        </Modal>
      )}
      {showQRCode && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showQRCode}
          onRequestClose={() => setShowQRCode(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <QRCode value={qrCodeData} size={250} />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowQRCode(false)}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    width: 200, // Adjust as needed
    height: 200, // Adjust as needed
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
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PaySteps;
