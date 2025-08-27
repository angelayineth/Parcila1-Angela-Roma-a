import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Appbar, Avatar, Text, TextInput, IconButton, Surface, Chip } from "react-native-paper";
import { useNavigation } from '@react-navigation/native'; 

export default function ChatBotSalon() {
  const navigation = useNavigation(); 

  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "👋 ¡Hola! Bienvenida a *EclaEstetic Spa & Beauty*. ¿En qué puedo ayudarte hoy?",
      fromBot: true,
    },
  ]);
  const [input, setInput] = useState("");

  const quickOptions = [
    "Agendar cita 💅",
    "Ver servicios ✨",
    "Promociones 💖",
    "Horario 🕒",
  ];

  const handleSend = (text) => {
    if (!text.trim()) return;

    const newMessage = { id: Date.now().toString(), text, fromBot: false };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      let botResponse = "No entendí muy bien 🤔. ¿Podrías repetirlo?";
      if (text.includes("servicio")) {
        botResponse =
          "Ofrecemos: uñas 💅, cabello 💇‍♀️, masajes 💆‍♀️ y tratamientos faciales 🌸.";
      } else if (text.includes("cita") || text.includes("agendar")) {
        botResponse =
          "Perfecto ✨, para agendar necesito tu nombre, el servicio y la hora que prefieras.";
      } else if (text.includes("promoción")) {
        botResponse =
          "Hoy tenemos 2x1 en manicure y 20% off en tratamientos capilares 💖.";
      } else if (text.includes("horario")) {
        botResponse =
          "Estamos disponibles de lunes a sábado, de 9:00am a 7:00pm 🕒.";
      }

      const botMessage = {
        id: Date.now().toString(),
        text: botResponse,
        fromBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };


  const handleCloseChat = () => {
    navigation.goBack();  
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#6cad7ec3" }}>
        <Appbar.Action
          icon="close" 
          onPress={handleCloseChat} 
          color="#fff"
        />
        <Appbar.Content
          title="Chat EclaEstetic"
          titleStyle={{ color: "#fff" }}
        />
        <Avatar.Image
          size={40}
          source={{
            uri: "https://i.pinimg.com/736x/1d/da/ad/1ddaaddf3ad62f6772198c80a16ea3f4.jpg",  
          }}
          style={{ backgroundColor: "#fff" }}
        />
      </Appbar.Header>

     
      <FlatList
        style={styles.chat}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Surface
            style={[styles.message, item.fromBot ? styles.botMessage : styles.userMessage]}
          >
            <Text style={{ color: item.fromBot ? "#000" : "#fff" }}>
              {item.text}
            </Text>
          </Surface>
        )}
      />

      <View style={styles.quickOptions}>
        {quickOptions.map((option, index) => (
          <Chip
            key={index}
            style={styles.chip}
            icon="chat"
            onPress={() => handleSend(option)}
          >
            {option}
          </Chip>
        ))}
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje..."
          value={input}
          onChangeText={setInput}
        />
        <IconButton
          icon="send"
          mode="contained"
          containerColor="#6cad7eb7"
          iconColor="white"
          onPress={() => handleSend(input)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#c4c3c345" },
  chat: { flex: 1, padding: 10 },
  message: {
    marginVertical: 6,
    padding: 12,
    borderRadius: 18,
    maxWidth: "80%",
    elevation: 2,
  },
  botMessage: { alignSelf: "flex-start", backgroundColor: "#fff" },
  userMessage: { alignSelf: "flex-end", backgroundColor: "#85a17aaa" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#efe9ecff",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  quickOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
    justifyContent: "center",
  },
  chip: { margin: 4, backgroundColor: "#65a57fb8" },
});
