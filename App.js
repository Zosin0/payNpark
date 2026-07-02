import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import WelcomeScreen from './src/screens/WelcomeScreen';
import Home from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import EstacionamentosScreen from './src/screens/EstacionamentosScreen';
import SessionScreen from './src/screens/SessionScreen';
import LogoutScreen from './src/screens/LogoutScreen';
import MenuHamburger from './src/components/MenuHamburger';
import CadastroPagamentoScreen from './src/screens/CadastroPagamentoScreen';
import CadastroVeiculoScreen from './src/screens/CadastroVeiculoScreen';
import PaySteps from './src/screens/EtapasDePagamentoScreen';
import FormasDePagamento from './src/screens/FormasDePagamentoScreen';
import SessaoEstacionamentoQrCode from './src/screens/sessaoEstacionamentoQrCode';
import Code from './src/components/code';
import MapScreen from './src/screens/MapScreen';
import PaymentConfirmation from './src/screens/ConfirmacaoPagamento';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  cardStyleInterpolator: ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  }),
  animationEnabled: true,
};

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={require('./assets/images/logo.png')} style={styles.logo} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={isAuthenticated ? 'HomeLoggedIn' : 'HomeLoggedOut'}>
      <Stack.Screen name="HomeLoggedIn" component={Home} />
      <Stack.Screen name="HomeLoggedOut" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Logout" component={LogoutScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="SessionScreen" component={SessionScreen} />
      <Stack.Screen name="EstacionamentosScreen" component={EstacionamentosScreen} />
      <Stack.Screen name="Pagamento" component={CadastroPagamentoScreen} />
      <Stack.Screen name="Veiculo" component={CadastroVeiculoScreen} />
      <Stack.Screen name="Menu" component={MenuHamburger} />
      <Stack.Screen name="QRCode" component={Code} />
      <Stack.Screen name="PayStep" component={PaySteps} />
      <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmation} />
      <Stack.Screen name="FormasDePagamento" component={FormasDePagamento} />
      <Stack.Screen name="sessaoEstacionamentoQrCode" component={SessaoEstacionamentoQrCode} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};

const App = () => (
  <AuthProvider>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  </AuthProvider>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 180,
  },
});

export default App;
