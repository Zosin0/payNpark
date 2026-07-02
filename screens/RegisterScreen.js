import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Icon from 'react-native-vector-icons/Entypo';
import apiClient from '../src/api/client';

const RegisterScreen = ({  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object


  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        console.error('As senhas não coincidem');
        return;
      }

      const response = await apiClient.post('/register', { email, password });
      const data = response.data;
      if (data.success) {
        navigation.navigate('Login')
        console.log('Usuário registrado com sucesso:', data.message);
      } else {
        console.error('Erro ao registrar:', data.message);
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  const getPasswordStrength = () => {
    const regexList = [
      /[a-z]/, // Lowercase letters
      /[A-Z]/, // Uppercase letters
      /[0-9]/, // Numbers
      /[^a-zA-Z0-9]/, // Special characters
    ];

    let strength = 0;
    if (password.length >= 8) {
      strength++;
    }

    regexList.forEach(regex => {
      if (regex.test(password)) {
        strength++;
      }
    });

    return strength;
  };

  const renderPasswordStrength = () => {
    const strength = getPasswordStrength();
    if (strength === 0) {
      return <Text style={styles.strengthIndicator}> Muito fraca</Text>;
    } else if (strength === 1) {
      return <Text style={styles.strengthIndicator}> Fraca</Text>;
    } else if (strength === 2) {
      return <Text style={styles.strengthIndicator}> Média</Text>;
    } else if (strength === 3) {
      return <Text style={styles.strengthIndicator}> Forte</Text>;
    } else {
      return <Text style={styles.strengthIndicator}> Muito forte</Text>;
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
      colors={['#FDDF76', '#172B4D']}
    >

      <View style={styles.containerHeader}>
        <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={25} color={'white'} children={<Text style={styles.sla}>Criar Conta</Text>} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}> Preencha seus dados</Text>
        <TextInput style={styles.inputtop} placeholder="Nome Completo" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirmar Senha" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
        <Text style={styles.strenght}>Força da senha: {renderPasswordStrength()}</Text>
        {password !== '' && confirmPassword !== '' && password !== confirmPassword && (
          <Text style={styles.errorText}>As senhas não coincidem</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    borderRadius: 20,
    left: -80,
    color: 'black', 
  },
  voltar: {
    width: 200,
    padding: 20,
    justifyContent: 'flex-start'
  },
  sla: {
    left: 10,
  },
  container: {
    backgroundColor: 'white',
    width: 320,
    height: 530,
    textAlign: 'center',
    alignItems: 'center',
    padding: 40,
    borderRadius: 10,
  },
  title: {
    marginBottom: 20,
  },
  inputtop: {
    width: '110%',
    marginBottom: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 5,
    marginTop: 20,
  },
  input: {
    width: '110%',
    marginBottom: 20,
    color: 'black',
    padding: 5,
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 5,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#FCE77B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 35,
    marginTop: 45,
    width: 170,
  },
  buttonText: {
    color: '#b',
    fontSize: 18,
    textAlign: 'center',
  },
  strengthIndicator: {
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  strenght: {
    fontSize: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginBottom: 5,
  },
});

export default RegisterScreen;
