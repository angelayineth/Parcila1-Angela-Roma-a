import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DetalleVariante from './detalle-unico';

export default function DetalleServicio({ servicio, volver }) {
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);

  if (varianteSeleccionada) {
    return (
      <DetalleVariante
        variante={varianteSeleccionada}
        volver={() => setVarianteSeleccionada(null)}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={volver}>
        <MaterialCommunityIcons name="arrow-left" size={28} color="#418844c8" />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>{servicio.nombre}</Text>
      </View>

      <View style={styles.variantsContainer}>
        {servicio.variantes.map(variante => (
          <TouchableOpacity
            key={variante.id}
            style={styles.card}
            onPress={() => setVarianteSeleccionada(variante)}
          >
            <Image source={{ uri: variante.urlimagen }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.tipo}>{variante.tipo}</Text>
              <View style={styles.reloj}>
                <MaterialCommunityIcons name="clock-outline" size={15} color="#555" style={{ marginRight: 5 }} />
                <Text style={styles.duracion}>{variante.duracion}</Text>
              </View>
              <Text style={styles.precio}>${variante.precio}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f2f2f7', 
    padding: 22, 
  },
  backButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12, 
    marginTop: 20,
  },
  backText: {
    marginLeft: 5, 
    color: '#418844c8', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  header: { marginBottom: 28 },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#333' 
  },
  variantsContainer: { 
    flexDirection: 'column',
    gap: 15 
  },
  card: { 
    borderRadius: 15, 
    overflow: 'hidden', 
    backgroundColor: '#fff', 
    marginBottom: 15,
    elevation: 5,                      
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: { 
    width: '100%',
    height: 180
  },
  cardContent: { 
    padding: 15,
    alignItems: 'center'
  },
  tipo: { 
    fontWeight: 'bold', 
    fontSize: 22,
    marginBottom: 8, 
    textAlign: 'center'
  },
  reloj: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8
  },
  duracion: { 
    fontSize: 16
  },
  precio: {
    fontSize: 22,
    color:'#418844c8',
    fontWeight: 'bold',
    marginTop: 5
  }
});
