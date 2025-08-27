import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Avatar, Button, Portal, Modal, IconButton, Provider as PaperProvider, FAB, Searchbar } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import especialistas from '../assets/especialistas.json';
import servicios from '../assets/servicios.json';
import ofertas from '../assets/ofertas.json';
import trabajos from '../assets/trabajos.json';
import { useNavigation } from '@react-navigation/native'; 



export default function Inicio() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation(); 
  
  

  const avatarUrl = "https://i.pinimg.com/736x/cc/53/97/cc539787374fe85db511b6501136fe9d.jpg";

  const openModal = (img) => { setSelectedImage(img); setModalVisible(true); };
  const closeModal = () => { setModalVisible(false); setSelectedImage(null); };

  const Section = ({ title }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionLine} />
    </View>
  );

  const Card = ({ item, type, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: item.urlimagen }} style={styles.cardImage} />
        {type === 'service' && <View style={styles.overlay}><Text style={styles.overlayText}>{item.nombre}</Text></View>}
        {type === 'offer' && <View style={styles.offerOverlay}><Text style={styles.offerText}>{item.name}</Text><Text style={styles.offerDesc}>{item.description}</Text></View>}
      </View>
    </TouchableOpacity>
  );

  const Specialist = ({ specialist }) => (
    <View style={styles.specialistCard}>
      <Image source={{ uri: specialist.urlimagen }} style={styles.specialistImage} />
      <View style={styles.specialistInfo}>
        <Text style={styles.specialistName}>{specialist.nombre}</Text>
        <Text>{'⭐'.repeat(specialist.estrellas)}</Text>
        <Text>{specialist.especialidad}</Text>
      </View>
    </View>
  );

  return (
    <PaperProvider>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Bienvenida, Angela</Text>
            <Avatar.Image size={45} source={{ uri: avatarUrl }} />
          </View>

          <Searchbar
            onChangeText={setSearch}
            value={search}
            style={styles.search}
          />
        </View>

        <ScrollView style={styles.content}>
          <Section title="Servicios"/>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
            {servicios.map(s => <Card key={s.id} item={s} type="service"/>)}
          </ScrollView>

          <Section title="Especialistas"/>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
            {especialistas.map(e => <Specialist key={e.id} specialist={e} />)}
          </ScrollView>

          <Section title="Ofertas Especiales"/>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
            {ofertas.map(o => <Card key={o.id} item={o} type="offer"/>)}
          </ScrollView>

          <Section title="Trabajos Realizados"/>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
            {trabajos.slice(0,4).map(t => <Card key={t.id} item={t} onPress={() => openModal(t.urlimagen)} />)}
          </ScrollView>
          <Button mode="contained" style={styles.galleryBtn} onPress={() => router.push('./galeria')}>Ver más trabajos</Button>
        </ScrollView>

        <FAB
          icon="chat"
          style={styles.chatBtn}
          onPress={() => router.push('./Chat')}
        />

        <Portal>
          <Modal visible={modalVisible} onDismiss={closeModal} contentContainerStyle={styles.modal}>
            <IconButton icon="close" size={28} onPress={closeModal} style={styles.modalClose}/>
            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.modalImage}/>}
          </Modal>
        </Portal>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffffdff' },
  header: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 15, backgroundColor: '#a8c5a2', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#f4f6f3ff', flex: 1, textAlign: 'center', marginLeft:'29%', marginTop:16 },

  
  testText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  search: { 
    backgroundColor: '#fff', 
    borderRadius: 30, 
    height: 40, 
    marginTop: 9,
  },

  content: { paddingBottom: 30 },
  section: { alignItems: 'center', marginVertical: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#4b633e' },
  sectionLine: { height: 3, width: '35%', backgroundColor: '#a8b99a', borderRadius: 2, marginTop: 4 },

  carousel: { paddingVertical: 10, paddingHorizontal: 10 },
  card: { marginRight: 12, width: 210, borderRadius: 15, overflow: 'hidden', backgroundColor: '#fff', elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, shadowOffset: { width: 0, height: 3 } },
  cardImageContainer: { position: 'relative', borderRadius: 15, overflow: 'hidden' },
  cardImage: { width: 210, height: 130, borderRadius: 15 },
  overlay: { position: 'absolute', top:0,left:0,right:0,bottom:0, backgroundColor:'rgba(56,55,55,0.3)', justifyContent:'center', alignItems:'center', padding:5 },
  overlayText: { color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
  offerOverlay: { position:'absolute', top:0,left:0,right:0,bottom:0, backgroundColor:'rgba(197,188,188,0.25)', justifyContent:'center', alignItems:'center', padding:5 },
  offerText: { color:'#fff', fontWeight:'bold', fontSize:18, textAlign:'center' },
  offerDesc: { color:'#fff', fontSize:14, textAlign:'center', marginTop:5 },

  specialistCard: { marginRight:15, width:210, borderRadius:18, overflow:'hidden', backgroundColor:'#fff', elevation:4, shadowColor:'#000', shadowOpacity:0.1, shadowRadius:5, shadowOffset:{ width:0, height:3 } },
  specialistImage: { width:'100%', height:180, borderRadius:18 },
  specialistInfo: { padding:6, alignItems:'center' },
  specialistName: { fontSize:15, fontWeight:"bold", textAlign:'center' },

  galleryBtn: { marginHorizontal:'23%', marginTop:15, borderRadius:25, backgroundColor:'#a8c5a2' },

  modal: { padding:20, backgroundColor:'white', justifyContent:'center', alignItems:'center', borderRadius:15 },
  modalClose: { position:'absolute', top:10, right:10, backgroundColor:'#fff', borderRadius:20, elevation:3 },
  modalImage: { width:'100%', height:300, resizeMode:'contain', marginTop:30 },

  chatBtn: {
    position: 'absolute',
    bottom: 2,
    right: 20,
    backgroundColor: '#8fbf8fdd',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#030303ff',
  }
});