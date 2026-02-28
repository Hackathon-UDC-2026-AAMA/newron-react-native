import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAudioPlayer } from 'expo-audio';

type Recording = {
  name: string;
  uri: string;
  createdAt: number;
};

export default function RecordingList() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const player = useAudioPlayer("");

  const loadRecordings = async () => {
    const stored = await AsyncStorage.getItem('recordings');
    const parsed = stored ? JSON.parse(stored) : [];
    setRecordings(parsed);
  };

  const playAudio = (uri: string) => {
    player.replace(uri);
    player.play();
  };

  useEffect(() => {
    loadRecordings();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grabaciones persistidas</Text>

      <Button title="Actualizar lista" onPress={loadRecordings} />

      <FlatList
        data={recordings}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => playAudio(item.uri)}
          >
            <Text>{item.name}</Text>
            <Text style={styles.date}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay grabaciones</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 15,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 8,
  },
  date: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  empty: {
    marginTop: 20,
    color: 'gray',
  },
});