import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { Appbar, Text, Surface, IconButton, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function HistorialCitas() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);  
  const [historialVacio, setHistorialVacio] = useState(true);  

  const eliminarHistorial = () => {
    Alert.alert(
      "Eliminar historial",
      "¿Seguro que quieres borrar tu historial de citas?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: () => {
          setLoading(true);
          setTimeout(() => {
            setHistorialVacio(true);
            setLoading(false);
          }, 1500); 
        }}
      ]
    );
  };

  return (
    <View style={styles.container}>
    
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => router.back()} color="#fff" />
        <Appbar.Content title="Historial de Citas" titleStyle={styles.appbarTitle} />
      </Appbar.Header>


      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Surface style={styles.surface}>
        
          {loading ? (
            <Text style={styles.loadingText}>Eliminando historial...</Text>
          ) : (
            <>
              {historialVacio ? (
                <Text style={styles.message}>Aún no tienes citas registradas.</Text>
              ) : (
                <Text style={styles.message}>Aquí aparecerán tus citas anteriores.</Text>
              )}
              <Button
                mode="outlined"
                icon="delete"
                onPress={eliminarHistorial}
                style={styles.deleteButton}
                labelStyle={styles.deleteButtonLabel}
              >
                Eliminar historial
              </Button>
            </>
          )}
        </Surface>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fdf8',
  },
  appbar: {
    backgroundColor: '#cfe1cb', 
  },
  appbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5ea372ff',  
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  surface: {
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 4,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    color: '#a09f9ff4',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 38,
    color: '#cfd5d1ff',
    textAlign: 'center',
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: 'rgba(143, 141, 141, 0.35)',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  deleteButtonLabel: {
    color: '#5d1818ff',
    fontWeight: 'bold',
  },
});
