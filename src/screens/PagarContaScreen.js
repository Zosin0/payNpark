import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PagarContaScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagar Conta</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    margin: 20,
    fontWeight: 'bold',
  },
});

export default PagarContaScreen;
