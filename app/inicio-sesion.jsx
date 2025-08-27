import React, { useState } from "react";
import { View, ScrollView, StyleSheet, ImageBackground, Linking, TouchableOpacity } from "react-native";
import { Text, TextInput, Button, ActivityIndicator, Snackbar, TouchableRipple, Icon, Avatar } from "react-native-paper";
import { useRouter } from "expo-router";

export default function InicioSesion() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const router = useRouter();

  const buscarUsuario = () => {
    if (!correo.trim() || !contrasena.trim()) {
      setMensajeError("Completa todos los campos");
      return setSnackbarVisible(true);
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const usuarioFijo = { correo: "angela@gmail.com", clave: "12345", nombre: "Angela" };

      if (correo.toLowerCase() === usuarioFijo.correo.toLowerCase() && contrasena === usuarioFijo.clave) {
        setCorreo("");
        setContrasena("");
        router.replace({
          pathname: "./screens/layout",
          params: { nombre: usuarioFijo.nombre }
        });
      } else {
        setMensajeError("Correo o contraseña incorrectos");
        setSnackbarVisible(true);
      }
    }, 1000);
  };

  const abrir = (url) => Linking.openURL(url).catch((err) => console.error("No se pudo abrir", err));

  return (
    <ImageBackground source={require("../imagenes/im3.jpg")} style={style.background}>
      <ScrollView style={{ backgroundColor: "transparent" }}>
        <View style={style.overlay}> 
          <Avatar.Image 
            size={90} 
            source={require("../imagenes/im4.jpg")} 
            style={style.avatar}
          />

          <Text variant="headlineLarge" style={style.title}>INICIAR SESIÓN</Text>

          <TextInput 
            placeholder="Correo electrónico" 
            value={correo} 
            onChangeText={setCorreo}
            left={<TextInput.Icon icon="email" color="#79776fff" />}
            style={style.input} 
            autoCapitalize="none" 
            mode="outlined"
            theme={{ roundness: 15, colors: { primary: "#4CAF50" } }}
          />

          <TextInput 
            placeholder="Contraseña" 
            value={contrasena} 
            onChangeText={setContrasena}
            secureTextEntry={!mostrarContrasena} 
            mode="outlined" 
            style={style.input}
            theme={{ roundness: 15, colors: { primary: "#4CAF50" } }}
            left={<TextInput.Icon icon="lock" color="#79776fff" />}
            right={contrasena ? <TextInput.Icon icon={mostrarContrasena ? "eye-off" : "eye"} onPress={() => setMostrarContrasena(!mostrarContrasena)} /> : null}
          />

          <TouchableRipple onPress={() => console.log("Recuperar clave")}>
            <Text style={style.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableRipple>

          <Button 
            mode="contained" 
            style={style.loginButton} 
            labelStyle={style.buttonLabel}
            onPress={buscarUsuario} 
            disabled={loading}
          >
            {loading ? <ActivityIndicator animating color="white" /> : "INICIAR SESIÓN"}
          </Button>

          <View style={style.dividerContainer}>
            <View style={style.divider} />
            <Text style={style.orText}>O</Text>
            <View style={style.divider} />
          </View>

          <View style={style.socialButtonsContainer}>
            {[
              { icon: "google", url: "https://accounts.google.com/signin/v2/identifier" },
              { icon: "apple", url: "https://appleid.apple.com/account" },
            ].map((s, i) => (
              <View key={i} style={style.socialIconWrapper}>
                <TouchableOpacity onPress={() => abrir(s.url)}>
                  <Icon source={s.icon} size={30} color="black" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <Snackbar 
        visible={snackbarVisible} 
        onDismiss={() => setSnackbarVisible(false)} 
        duration={3000}
      >
        {mensajeError}
      </Snackbar>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  background: {
    width:'100%',
    height:'100%', 
    resizeMode: "cover", 
    justifyContent: "center" 
  },
  overlay: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20, 
    marginTop:'32%'
  },
  avatar: {
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#79767dff", 
  },
  title: { 
    fontSize: 36, 
    fontWeight: "bold", 
    marginBottom: 30, 
    textAlign: "center", 
    color: "#8fbf8fdd", 
    marginTop: 15 
  },
  input: { 
    marginBottom: 15, 
    backgroundColor: "white" 
  },
  forgotPassword: { 
    color: "#a18cf0", 
    textAlign: "right", 
    marginBottom: 20, 
    marginTop: 5, 
    fontSize: 13 
  },
  loginButton: { 
    backgroundColor: "#4188459f", 
    borderRadius: 30, 
    marginBottom: 10, 
    paddingVertical: 5 
  },
  buttonLabel: { 
    fontWeight: "bold",
    fontSize: 18 
  },
  dividerContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginVertical: 10 
  },
  divider: { 
    flex: 1, 
    height: 1, 
    backgroundColor: "#bbb" 
  },
  orText: { 
    marginHorizontal: 8, 
    color: "#bbb", 
    fontWeight: "bold" 
  },
  socialButtonsContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginTop: 10 
  },
  socialIconWrapper: { 
    backgroundColor: "#fff", 
    borderRadius: 30, 
    padding: 9, 
    borderWidth: 1, 
    borderColor: "#313131ff",
    shadowColor: "#313131ff", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 3.5, 
    marginHorizontal: 17 
  },
});
