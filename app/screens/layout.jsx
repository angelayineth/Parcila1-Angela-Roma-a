import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { BottomNavigation, Drawer, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Inicio from './pantallaPrincipal';
import Servicios from './servicios';
import ReservaCitas from './citas';
import MiCuenta from './MiCuenta';
import InicioSesion from '../inicio-sesion';

import Notificaciones from './notificaciones';
import Promociones from './promociones';
import Acerca from './acerca';
import Ayuda from './ayuda';


export default function HomeLayout() {
  const [index, setIndex] = useState(0);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerScreen, setDrawerScreen] = useState('');

  const navigation = useNavigation();

  const routes = [
    { key: 'pantallaPrincipal', title: 'Inicio', icon: 'home' },
    { key: 'servicios', title: 'Servicios', icon: 'briefcase' },
    { key: 'citas', title: 'ReservaCitas', icon: 'calendar' },
    { key: 'MiCuenta', title: 'MiCuenta', icon: 'account' },
  ];

  const renderScene = BottomNavigation.SceneMap({
    pantallaPrincipal: () => <Inicio />,
    servicios: () => <Servicios />,
    citas: () => <ReservaCitas />,
    MiCuenta: () => <MiCuenta />,
  });

  const renderDrawerScreen = () => {
    switch (drawerScreen) {
      case 'notificaciones': return <Notificaciones />;
      case 'promociones': return <Promociones />;
      case 'acerca': return <Acerca />;
      case 'ayuda': return <Ayuda />;
      case 'inicio-sesion': return <InicioSesion />;
      case 'pantallaPrincipal': return <Inicio />;
      default: return null;
    }
  };

  const shouldShowMenuButton = index !== 1 && index !==2 &&  index !== 2;

  const handleLogout = () => {
    setDrawerVisible(false);
    setDrawerScreen('');
    navigation.reset({
      index: 0,
      routes: [{ name: 'inicio-sesion' }],
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        shifting={true}
        labeled={true}
        activeColor="#4b633eb5"
        inactiveColor="#888"
        barStyle={styles.bottomBar}
        renderIcon={({ route, color }) => (
          <MaterialCommunityIcons name={route.icon} color={color} size={26} />
        )}
      />

      {shouldShowMenuButton && (
        <IconButton
          icon="menu"
          size={28}
          onPress={() => setDrawerVisible(true)}
          style={styles.menuButton}
        />
      )}

      {drawerVisible && (
        <View style={styles.drawerContainer}>
          <View style={styles.drawerHeader}>
            <IconButton
              icon="close"
              size={22}
              onPress={() => setDrawerVisible(false)}
              style={styles.drawerCloseIcon}
            />
            <View style={styles.userInfo}>
              <Image
                source={{ uri: 'https://i.pinimg.com/736x/cc/53/97/cc539787374fe85db511b6501136fe9d.jpg' }}
                style={styles.avatarImage}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.userName}>Angela</Text>
                <Text style={styles.userEmail}>angela@email.com</Text>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <Drawer.Item
              label="Historial de Citas"
              icon={({ color }) => <MaterialCommunityIcons name="history" color="#4b633e" size={24} />}
              onPress={() => {}}
            />
            <Drawer.Item
              label="Promociones"
              icon={({ color }) => <MaterialCommunityIcons name="tag" color="#4b633e" size={24} />}
              onPress={() => {}}
            />
            <Drawer.Item
              label="Notificaciones"
              icon={({ color }) => <MaterialCommunityIcons name="bell" color="#4b633e" size={24} />}
              onPress={() => {}}
            />
            <Drawer.Item
              label="Ayuda y Soporte"
              icon={({ color }) => <MaterialCommunityIcons name="help-circle" color="#4b633e" size={24} />}
              onPress={() => {}}
            />
            <Drawer.Item
              label="Acerca de"
              icon={({ color }) => <MaterialCommunityIcons name="information" color="#4b633e" size={24} />}
              onPress={() => {}}
            />
          </Drawer.Section>

          <Drawer.Item
            label="Cerrar Sesión"
            icon="logout"
            onPress={handleLogout}
            labelStyle={styles.logoutLabel}
            iconColor="red"
            style={styles.logoutItem}
          />
        </View>
      )}

      {drawerScreen !== '' && (
        <View style={styles.drawerScreenContainer}>
          {renderDrawerScreen()}
          <IconButton
            icon="close"
            size={28}
            onPress={() => setDrawerScreen('')}
            style={styles.closeButton}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: '#ffffff',
    elevation: 8,
    height: '12%',
  },
  menuButton: {
    position: 'absolute',
    top: 19,
    left: 10,
    right:5,
    zIndex: 1,
    backgroundColor: '#fff',
  },
  drawerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 280,
    height: '100%',
    backgroundColor: '#ffffff',
    zIndex: 20,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 4, height: 0 },
    shadowRadius: 4,
    elevation: 5,
  },
  drawerHeader: {
    backgroundColor: '#a8c5a2',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
  },
  drawerCloseIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#e6f2ec',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#ccc',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
  },
  drawerSection: {
    marginTop: 16,
  },
  logoutItem: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 10,
  },
  logoutLabel: {
    color: 'red',
  },
  drawerScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 10,
    zIndex: 40,
    backgroundColor: '#fff',
  },
});
