import { Text, View, StyleSheet, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { sendIngest } from "@/components/API/ingestService";

export default function Index() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!text.trim()) {
      Alert.alert("Error", "El campo no puede estar vacío");
      return;
    }

    try {
      setLoading(true);

      const response = await sendIngest(text);

      console.log("Respuesta backend:", response);

      // Si no quieres mostrar nada en pantalla,
      // simplemente lo dejamos aquí.
      
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      Alert.alert("Error", "No se pudo enviar la petición");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enviar texto al backend</Text>

      <TextInput
        placeholder="Escribe algo..."
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <Button
        title={loading ? "Enviando..." : "Enviar"}
        onPress={handleSend}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    width: "100%",
    padding: 10,
    marginVertical: 15,
    borderWidth: 1,
  },
});