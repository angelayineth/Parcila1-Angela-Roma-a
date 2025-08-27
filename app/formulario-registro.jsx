import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { TextInput, Button, Text, Avatar, Snackbar, ActivityIndicator, TouchableRipple } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Registro() {
  const router = useRouter();

  const [form, setForm] = useState({ nombre: "", correo: "", telefono: "", password: "" });
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [snackbar, setSnackbar] = useState({ visible: false, msg: "" });

  const mostrarSnackbar = (msg) => setSnackbar({ visible: true, msg });

  const handleChange = (field, value) => setForm({ ...form, [field]: value });


  const handleRegistro = () => {
    const { nombre, correo, telefono, password } = form;

    if (!nombre || !correo || !telefono || !password) return mostrarSnackbar("Por favor, rellena todos los campos");
    if (usuarios.some((u) => u.correo === correo)) return mostrarSnackbar(" El usuario ya existe con este correo");
    if (password.length < 4) return mostrarSnackbar(" La contraseña debe tener al menos 4 caracteres");

    setLoading(true);
    setTimeout(() => {
      setUsuarios([...usuarios, form]);
      setForm({ nombre: "", correo: "", telefono: "", password: "" });
      mostrarSnackbar(" Usuario registrado con éxito");
      setLoading(false);
    }, 1500);
  };

  return (
    <ImageBackground source={require("../imagenes/im3.jpg")} style={styles.background}>
      <View style={styles.overlay}>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Avatar.Icon size={80} icon="account" style={{ backgroundColor: "#418845b1" }} />
        </View>

        <Text style={styles.title}>Registro</Text>

        {[
          { placeholder: "Nombre", icon: "account", key: "nombre" },
          { placeholder: "Correo electrónico", icon: "email", key: "correo" },
          { placeholder: "Teléfono", icon: "phone", key: "telefono" },
        ].map((item) => (
          <TextInput
            key={item.key}
            placeholder={item.placeholder}
            mode="outlined"
            style={styles.input}
            value={form[item.key]}
            onChangeText={(val) => handleChange(item.key, val)}
            left={<TextInput.Icon icon={item.icon} color="#79776fff" />}
            theme={{ roundness: 15, colors: { primary: "#4CAF50" } }}
          />
        ))}

        <TextInput
          placeholder="Contraseña"
          mode="outlined"
          secureTextEntry={!showPassword}
          style={styles.input}
          value={form.password}
          onChangeText={(val) => handleChange("password", val)}
          left={<TextInput.Icon icon="lock" color="#79776fff" />}
          right={
            form.password.length > 0 && (
              <TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />
            )
          }
          theme={{ roundness: 15, colors: { primary: "#4caf4fff" } }}
        />

        <Button mode="contained" style={styles.greenButton} onPress={handleRegistro} disabled={loading}>
          {loading ? <ActivityIndicator animating={true} color="#201e1eff" /> : "Registrarse"}
        </Button>

        <TouchableRipple onPress={() => router.push("/inicio-sesion")} >
          <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableRipple>

        <Snackbar
          visible={snackbar.visible}
          onDismiss={() => setSnackbar({ visible: false, msg: "" })}
          duration={3000}
          
        >
          {snackbar.msg}
        </Snackbar>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background:{ 
    width:'100%',
    height:'100%' 
  },
  overlay: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20, 
    margin: 20, 
    borderRadius: 20 
  },
  title: { 
    fontSize: 32, 
    marginBottom: 20, 
    textAlign: "center", 
    color: "#418844c8", 
    fontWeight: "bold" 
  },
  input: { 
    marginBottom: 15, 
    backgroundColor: "#fff" 
  },
  greenButton: { 
    backgroundColor: "#418845ab", 
    borderRadius: 15, 
    marginTop: 20 },
    
  link: { 
    marginTop: 29, 
    textAlign: "center", 
    color: "#418844c8", 
    textDecorationLine: "underline", 
  },
});
