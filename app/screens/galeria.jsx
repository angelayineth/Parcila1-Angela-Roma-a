import React, { useState } from 'react';
import { ScrollView, StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native';
import {  Portal, Modal, IconButton, Appbar, Provider as PaperProvider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import trabajos from '../assets/trabajos.json';

export default function Galeria() {
  const router = useRouter();
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedTrabajo, setSelectedTrabajo] = useState(null);

  const openModal = (trabajo) => {
    setSelectedTrabajo(trabajo);
    setVisibleModal(true);
  };

  const closeModal = () => {
    setVisibleModal(false);
    setSelectedTrabajo(null);
  };

  return (
    <PaperProvider>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="#8fbf8fdd" onPress={() => router.back()} />
        <Appbar.Content
          title="Galería de trabajos"
          titleStyle={styles.title}
        />
      </Appbar.Header>
    

      <ScrollView contentContainerStyle={styles.container}>
        {trabajos.map((trabajo) => (
          <TouchableOpacity key={trabajo.id} onPress={() => openModal(trabajo)}>
            <Image source={{ uri: trabajo.urlimagen }} style={styles.trabajoImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Portal>
        <Modal visible={visibleModal} onDismiss={closeModal} contentContainerStyle={styles.modalContainer}>
          {selectedTrabajo && (
            <>
             
              <View style={styles.imageWrapper}>
                <Image source={{ uri: selectedTrabajo.urlimagen }} style={styles.modalImage} />
                <IconButton
                  
                  size={26}
                  onPress={closeModal}
                 
                  iconColor="#fff"
                />
              </View>
              
            </>
          )}
        </Modal>
      </Portal>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
 
  header: {
    backgroundColor:'#b7b7b7ff', 
    elevation: 1,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1,
  },
  container: {
    height:'100%',
    backgroundColor:'#cac8c8ff' ,
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    padding: 10 
  },
  trabajoImage: { 
    width: 150, 
    height: 150, 
    borderRadius: 15, 
    margin: 5, 
    elevation: 3 
  },
  modalContainer: { 
    marginHorizontal: 20, 
    marginVertical: '67%', 
    borderRadius: 20, 
    overflow: 'hidden',
    elevation: 5 
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 390,
  },
  modalImage: { 
    width: '100%', 
    height: '100%', 
  },
  
});
