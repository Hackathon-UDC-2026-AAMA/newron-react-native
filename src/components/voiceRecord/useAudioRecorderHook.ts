import { useEffect, useState } from "react";
import {
  useAudioRecorder,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
} from "expo-audio";
import { File, Directory, Paths } from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAudioRecorderHook = () => {
  const audioRecorder = useAudioRecorder(
    RecordingPresets.HIGH_QUALITY
  );

  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    (async () => {
      const status =
        await AudioModule.requestRecordingPermissionsAsync();

      if (!status.granted) {
        console.log("Permiso de micrófono denegado");
        return;
      }

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  const startRecording = async () => {
    try {
      await audioRecorder.prepareToRecordAsync();
      await audioRecorder.record();
      setIsRecording(true);
    } catch (error) {
      console.log("Error iniciando grabación:", error);
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecorder.stop();
      setIsRecording(false);

      const tempUri = audioRecorder.uri;
      if (!tempUri) return null;

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

      const stored = await AsyncStorage.getItem("recordings");
      const recordings = stored ? JSON.parse(stored) : [];

      recordings.unshift(newRecording);

      await AsyncStorage.setItem(
        "recordings",
        JSON.stringify(recordings)
      );

      console.log("New Recording", newRecording)
      return newRecording;
    } catch (error) {
      console.log("Error deteniendo grabación:", error);
      return null;
    }
  };

  return {
    startRecording,
    stopRecording,
    isRecording,
  };
};