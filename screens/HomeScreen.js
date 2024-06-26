import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importação do FontAwesome
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import MenuHamburger from '../components/MenuHamburger';
import CenteredFooter from '../components/Footer';

const Home = ({  }) => {

  const navigation = useNavigation(); // Use useNavigation hook to get navigation object

  const getLocation = () => {
    // Lógica para obter a localização do usuário
  };

  const checkActiveSession = () => {
    // Lógica para verificar se existe uma sessão de estacionamento ativa
  };

  const readTicket = () => {
    // Lógica para ler o ticket de estacionamento
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/images/background1.png')} style={styles.backgroundImage} /> */}

      <View style={styles.content}>
      <MenuHamburger></MenuHamburger>,
        <Image source={require('../assets/images/logo.png')} style={styles.logo}/>
        <Text style={styles.title}>Você no estacionamento:</Text>

        <TouchableOpacity style={styles.button} onPress={getLocation}>
          <FontAwesome name="location-arrow" size={20} color="black" style={styles.icon} 
          onPress={() => navigation.navigate('')}
          />
          <Text style={styles.buttonText}>Pegar Localização</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Opções:</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PayStep')}>
          <FontAwesome name="ticket" size={20} color="black" style={styles.icon} />
          <Text style={styles.buttonText}>Pagar Ticket</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('sessaoEstacionamentoQrCode')}>
          <FontAwesome name="ticket" size={20} color="black" style={styles.icon} />
          <Text style={styles.buttonText}>Pagar Ticket 2</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('')}>
          <FontAwesome name="parking" size={20} color="black" style={styles.icon} />
          <Text style={styles.buttonText}>Estacionamentos Parceiros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SessionScreen')}>
          <FontAwesome name="plus" size={20} color="black" style={styles.icon} />
          <Text style={styles.buttonText}>Criar uma sessão</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Logout')}>
          <FontAwesome name="faRightFromBracket" size={20} color="black" style={styles.icon} />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <CenteredFooter/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDDF76',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,

  },
  icon: {
    marginRight: 10,
  },
});

export default Home;
