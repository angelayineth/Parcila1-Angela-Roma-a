import { useState } from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { router } from 'expo-router';

const vegetableBackground = require('../imagenes/im3.jpg');
const chefLogo = require('../imagenes/im4.jpg');

export default function pantalla() {
  const { colors } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const handleLoginPress = () => {
    router.push('/inicio-sesion');
  };

  const handleRegisterPress = () => {
    router.push('/formulario-registro');
  };

  return (
    <ImageBackground
      source={vegetableBackground}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View >
          <Text style={styles.text}>EclastEstict</Text>

          <Image source={chefLogo} style={styles.logo}  />
         
        </View>

       
        <Button
          mode="contained"
          onPress={handleLoginPress}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          style={[
            styles.button,
            { 
              backgroundColor: isPressed ? '#418845aa' : '#418845a0',
            }
          ]}
          contentStyle={styles.buttonContent}
          labelStyle={[styles.buttonLabel, { width:'90%'}]}
        >
          Iniciar sesión
        </Button>

        
        <Button
          mode="outlined"
          onPress={handleRegisterPress}
          style={[styles.button, styles.registerButton]}
          contentStyle={styles.buttonContent}
          labelStyle={[styles.buttonLabel, { color: '#54954cc6' , width:'90%'}]}
        >
          Crear una cuenta
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width:'100%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    marginBottom:15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  
  logo: {
    width: 290,
    height: 270,
   
   alignSelf:'flex-start'
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#418844c8',
    marginTop: 5,
    textAlign: 'center',
  },
  button: {
    marginTop:30,
    marginBottom:6,
    borderRadius: 25,
    width: '70%',
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  registerButton: {
    marginTop: 10,
    backgroundColor: 'transparent',
    borderColor: '#418844c8',
    borderWidth: 1,
  },
});