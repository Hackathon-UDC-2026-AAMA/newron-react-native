import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { VoiceNote } from "../ui/voiceNote";


type Recording = {
  name: string;
  uri: string;
  createdAt: number;
};

export default function RecordingList() {
  const [recordings, setRecordings] = useState<Recording[]>([]);

  const loadRecordings = async () => {
    const stored = await AsyncStorage.getItem("recordings");
    const parsed = stored ? JSON.parse(stored) : [];
    setRecordings(parsed);
  };

  useEffect(() => {
    loadRecordings();
  }, []);

  const renderItem = ({ item }: { item: Recording }) => {
    const time = new Date(item.createdAt)
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    return (
      <VoiceNote
        audioUri={item.uri}
        time={time}
        isSender={true} // 🔥 puedes cambiar lógica si quieres
        read={true}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grabaciones persistidas</Text>

      <Button title="Actualizar lista" onPress={loadRecordings} />

      <FlatList
        data={recordings}
        keyExtractor={(item) => item.uri}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay grabaciones</Text>
        }
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ECE5DD", // 🔥 fondo tipo WhatsApp
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  empty: {
    marginTop: 20,
    color: "gray",
  },
});