import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import WelcomeScreen from './screens/WelcomeScreen';
import Home from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import EstacionamentosScreen from './screens/EstacionamentosScreen';
import SessionScreen from './screens/SessionScreen';
import LogoutScreen from './screens/LogoutScreen';
import MenuHamburger from './components/MenuHamburger';
import CadastroPagamentoScreen from './screens/CadastroPagamentoScreen';
import CadastroVeiculoScreen from './screens/CadastroVeiculoScreen';
import PaySteps from './screens/EtapasDePagamentoScreen';
import FormasDePagamento from './screens/FormasDePagamentoScreen';
import SessaoEstacionamentoQrCode from './screens/sessaoEstacionamentoQrCode';
import Code from './components/code';
import MapScreen from './screens/MapScreen';
import PaymentConfirmation from './screens/ConfirmacaoPagamento';

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
