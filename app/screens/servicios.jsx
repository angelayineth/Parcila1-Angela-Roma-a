import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import detallesServicios from '../assets/detalles.json';
import DetalleServicio from './detalle-servicio';

export default function Servicios() {
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  if (servicioSeleccionado) {
    return <DetalleServicio servicio={servicioSeleccionado} volver={() => setServicioSeleccionado(null)} />;
  }

  const Section = ({ title }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionLine} />
    </View>
  );

  return (
    <View style={styles.fullScreen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Section title="Servicios" />

        <View style={styles.list}>
          {detallesServicios.map(servicio => (
            <TouchableOpacity
              key={servicio.idServicio}
              style={styles.card}
              onPress={() => setServicioSeleccionado(servicio)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: servicio.urlimagen }} style={styles.cardImage} />

              <View style={styles.overlay}>
                <Text style={styles.overlayText}>{servicio.nombre}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1, backgroundColor: '#f2f2f7', marginTop: 2 },
  scrollContainer: { padding: 18 },

  section: { alignItems: 'center', marginVertical: 10,marginTop: 4 },
  sectionTitle: { fontSize: 23, fontWeight: 'bold', color: '#4b633e',marginTop:2,marginBottom:15 },
  sectionLine: { height: 6, width: '90%', backgroundColor: '#a8b99a', borderRadius: 2, marginBottom: 10},

  list: { flexDirection: 'column' },

  card: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  overlay: {
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  overlayText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

