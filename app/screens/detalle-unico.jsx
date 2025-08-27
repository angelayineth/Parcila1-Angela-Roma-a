import React from 'react';
import { ScrollView, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DetalleUnico({ variante, volver }) {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={volver}>
        <MaterialCommunityIcons name="arrow-left" size={28} color="#418844c8" />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Image source={{ uri: variante.urlimagen }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.tipo}>{variante.tipo}</Text>
          {variante.descripcion && (
            <Text style={styles.descripcion}>{variante.descripcion}</Text>
          )}
          <View style={styles.reloj}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={15}
              color="#555"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.duracion}>{variante.duracion}</Text>
          </View>
          <Text style={styles.precio}>${variante.precio}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f2f2f7', 
    padding: 20,
  },
  backButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16, 
    marginTop: 20 
  },
  backText: { 
    marginLeft: 5, 
    color: '#418844c8', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  card: {
    marginTop:20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 19,
    marginBottom: 20,
    elevation: 5, 
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  tipo: { 
    fontWeight: 'bold', 
    fontSize: 24, 
    textAlign: 'center', 
    marginBottom: 15 
  },
  image: { 
    width: '102%', 
    height: 290, 
    borderRadius: 15,
    marginBottom: 15
  },
  content: { 
    paddingHorizontal: 5 
  },
  descripcion: { 
    fontSize: 15, 
    color: '#555', 
    textAlign: 'justify', 
    marginBottom: 10 
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
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#418844c8', 
    marginTop: 5,
    textAlign:'left'
  }
});
