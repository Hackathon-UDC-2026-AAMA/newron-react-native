import { useEffect, useState } from "react";
import { View, StyleSheet, Button, Alert, Text } from "react-native";
import {
  useAudioRecorder,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorderState,
} from "expo-audio";
import { File, Directory, Paths } from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Recorder() {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  const [savedUri, setSavedUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const record = async () => {
    await audioRecorder.prepareToRecordAsync();
    await audioRecorder.record();
  };

  const stopRecording = async () => {
    await audioRecorder.stop();

    const tempUri = audioRecorder.uri;
    if (!tempUri) return;

    const fileName = `recording-${Date.now()}.m4a`;

    const tempFile = new File(tempUri);
    const documentsDir = new Directory(Paths.document);
    const newFile = new File(documentsDir, fileName);

    await tempFile.move(newFile);

    const newRecording = {
      name: fileName,
      uri: newFile.uri,
      createdAt: Date.now(),
    };

    // Obtener grabaciones actuales
    const stored = await AsyncStorage.getItem("recordings");
    const recordings = stored ? JSON.parse(stored) : [];

    recordings.unshift(newRecording);

    await AsyncStorage.setItem("recordings", JSON.stringify(recordings));

    console.log("Guardado y persistido en AsyncStorage");
  };

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied");
      }

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title={recorderState.isRecording ? "Stop Recording" : "Start Recording"}
        onPress={recorderState.isRecording ? stopRecording : record}
      />

      {fileName && (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre del archivo:</Text>
          <Text style={styles.value}>{fileName}</Text>

          <Text style={styles.label}>Ruta:</Text>
          <Text style={styles.value}>{savedUri}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 20,
  },
  infoContainer: {
    marginTop: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    fontSize: 12,
    color: "#555",
  },
});
