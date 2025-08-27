import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { Avatar, Text, List, Switch, Button, Card, Badge, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';


export default function MiCuenta() {
  const router = useRouter();
  const [notificaciones, setNotificaciones] = useState(true);
  const [notificacionesPromo, setNotificacionesPromo] = useState(true);
  const [notificacionesCitas, setNotificacionesCitas] = useState(true);

  const acciones = {
    cerrarSesion: () => {
      Alert.alert("Cerrar sesión", "¿Estás segura que deseas cerrar sesión?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Cerrar sesión", style: "destructive", onPress: () => router.replace('/inicio-sesion') }
      ]);
    },
    editarPerfil: () => router.push('./editarPerfil'),
    verHistorialCitas: () => router.push('./historial-citas'),
    verFavoritos: () => router.push('/mis-favoritos'),
  };

  const notificacionesItems = [
    {
      title: "Notificaciones generales",
      description: "Recibir todas las notificaciones",
      icon: "bell",
      value: notificaciones,
      onChange: setNotificaciones,
    },
    {
      title: "Recordatorios de citas",
      description: "Avisos antes de tus citas",
      icon: "calendar-clock",
      value: notificacionesCitas,
      onChange: setNotificacionesCitas,
    },
    {
      title: "Promociones y ofertas",
      description: "Enterarte de descuentos especiales",
      icon: "sale",
      value: notificacionesPromo,
      onChange: setNotificacionesPromo,
    },
  ];

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Avatar.Image size={120} source={{ uri: 'https://i.pinimg.com/736x/cc/53/97/cc539787374fe85db511b6501136fe9d.jpg' }} />
          <IconButton icon="pencil" size={20} iconColor="#fff" style={styles.editAvatarButton}  />
        </View>
        <Text style={styles.name}>Angela Romaña</Text>
        <Text style={styles.email}>angela@gmail.com</Text>
        <Badge style={styles.membershipBadge} size={28}>Cliente VIP ✨</Badge>
      </View>


      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Citas realizadas</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Servicios favoritos</Text>
        </View>
      </View>

      
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Mi Cuenta</Text>

        <List.Item
          title="Historial de citas"
          description="Ver todas mis citas anteriores"
          left={props => <List.Icon {...props} icon="history" color="#4a9960" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={acciones.verHistorialCitas}
          style={styles.listItem}
        />

        <List.Item
          title="Mis favoritos"
          description="Servicios y especialistas favoritos"
          left={props => <List.Icon {...props} icon="heart" color="#4a9960" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          style={styles.listItem}
        />
      </Card>


      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Notificaciones</Text>

        {notificacionesItems.map((item, index) => (
          <List.Item
            key={index}
            title={item.title}
            description={item.description}
            left={props => <List.Icon {...props} icon={item.icon} color="#4a9960" />}
            right={() => (
              <Switch
                value={item.value}
                onValueChange={item.onChange}
                color="#4a9960"
              />
            )}
            style={styles.listItem}
          />
        ))}
      </Card>

      <Button
        mode="contained"
        style={styles.logoutButton}
        labelStyle={styles.logoutButtonText}
        onPress={acciones.cerrarSesion}
        icon="logout"
      >
        Cerrar sesión
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fdf8' },
  header: {
    backgroundColor: '#a8c5a2',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  avatarContainer: { position: 'relative' },
  editAvatarButton: {
    position: 'absolute',
    right: -5,
    bottom: 5,
    backgroundColor: '#4a9960',
  },
  name: { fontSize: 22, fontWeight: 'bold', color: '#ffffff', marginTop: 12 },
  email: { fontSize: 16, color: '#f0f8f0', marginTop: 4 },
  membershipBadge: { backgroundColor: '#4a9960', color: '#fff', marginTop: 10 },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    paddingVertical: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#4a9960' },
  statLabel: { fontSize: 12, color: '#666', textAlign: 'center', marginTop: 4 },
  statDivider: { width: 1, backgroundColor: '#e0e0e0', marginHorizontal: 10 },
  sectionCard: {
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#4a9960', padding: 20, paddingBottom: 10 },
  listItem: { paddingHorizontal: 20, paddingVertical: 8 },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#6cad7eb7',
    borderRadius: 25,
    paddingVertical: 10,
  },
  logoutButtonText: { fontSize: 16, fontWeight: 'bold' },
});
