import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function Promociones() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Sección sin definir</Text>
      <IconButton
        icon="thumb-up-outline"
        size={32}
        onPress={() => {}}
        style={styles.voto}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 18,
    marginBottom: 10,
    color: '#444',
  },
  voto: {
    backgroundColor: '#e6e6e6',
  },
});
