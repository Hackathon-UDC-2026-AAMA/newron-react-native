import { View, StyleSheet, Button } from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import { Directory, Paths } from 'expo-file-system';
import { useEffect, useState } from 'react';

export default function Player() {

  const [audioUri, setAudioUri] = useState(null);
  const player = useAudioPlayer(audioUri ?? "");

  useEffect(() => {
  const loadLatestRecording = async () => {
    const documentsDir = new Directory(Paths.document);
    const files = await documentsDir.list();

    const recordings = files
      .filter(file => file.name.startsWith("recording-"))
      .sort((a, b) => b.name.localeCompare(a.name));

    if (recordings.length > 0) {
      setAudioUri(recordings[0].uri);
    }
  };

  loadLatestRecording();
}, []);

  return (
    <View style={styles.container}>
      <Button
        title="Play Sound"
        onPress={() => audioUri && player.play()}
      />
      <Button
        title="Replay Sound"
        onPress={() => {
          if (!audioUri) return;
          player.seekTo(0);
          player.play();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});