// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Icon from 'react-native-vector-icons/Entypo'; // Importe o conjunto de ícones Ionicons
import apiClient from '../api/client';
import { useAuth } from '../context/AuthContext';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object
  const { login } = useAuth();

  const handleLogin = async () => {

    try {
      const response = await apiClient.post('/login', { email, password });
      const data = response.data;
      if (data.success) {
        await login(data.token);
        navigation.navigate('HomeLoggedIn');
      } else {
        console.error('Erro ao logar:', data.message);
      }
    } catch (error) {
      console.error('Erro ao logar:', error);
    }
  };

  return (
    <LinearGradient
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
      }}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      colors={['#FDDF76', '#172B4D']}>

      <View style={styles.containerHeader}>
        <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={25} color={'white'} children={<Text style={styles.sla}>Login</Text>}/>
        </TouchableOpacity>
      </View>

      <View style={styles.containerForm}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.text}>Preencha seus dados de login</Text>
        <TextInput
          style={styles.inputtop}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Don't have an account? Register here</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>


  );
};

const styles = StyleSheet.create({
  containerHeader:{
    borderRadius: 20,
    left: -75,
  },
  voltar: { 
    width: 200,
    padding: 20,
    justifyContent: 'flex-start'
  },
  sla:{
    left: 10,
  },
  containerForm: {
    backgroundColor: 'white',
    width: 300,
    height: 630,
    textAlign: 'center',
    alignItems: 'center',
    padding: 40,
    borderRadius: 10,
  },
  text: {
    color: '#5B5C5D',
    padding: 30,
    top: 30,
    fontSize: 12,
  },
  inputtop: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginTop: 20
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginTop: 5
  },
  button: {
    backgroundColor: '#FCE77B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 35,
    marginTop: 45,
    width: 170
  },
  buttonText: {
    color: '#212529',
    fontSize: 18,
    textAlign: 'center'
  },
  registerText: {
    marginTop: 10,
    color: '#007bff',
  },
  logo: {
    width: 250,
    height: 160,
    top: 10
  },

});

export default LoginScreen;
