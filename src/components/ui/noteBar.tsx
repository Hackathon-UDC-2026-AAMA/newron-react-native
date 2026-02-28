import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ToastAndroid,
  Alert,
} from "react-native";
import { Mic, Send, Paperclip } from "lucide-react-native";
import { useAudioRecorderHook } from "../voiceRecord/useAudioRecorderHook";
import { sendIngestAudio } from "@/API/ingestService";
import * as DocumentPicker from "expo-document-picker";
import { useShareIntent } from "expo-share-intent";

const { width } = Dimensions.get("window");
const BAR_WIDTH = width * 0.8;

export const NoteBar: React.FC = () => {
  const [text, setText] = useState("");

  const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntent();

  const { startRecording, stopRecording, isRecording } = useAudioRecorderHook();

  useEffect(() => {
    if (hasShareIntent && shareIntent) {
      const sharedValue =
        shareIntent.webUrl || shareIntent.text || shareIntent.value;

      if (sharedValue) {
        setText(sharedValue);

        if (Platform.OS === "android") {
          ToastAndroid.show("Enlace recibido", ToastAndroid.SHORT);
        }

        resetShareIntent();
      }
    }
  }, [hasShareIntent, shareIntent]);

  const hasText = text.trim().length > 0;

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) return;

      const file = result.assets[0];

      console.log("Archivo seleccionado:");
      console.log("Nombre:", file.name);
      console.log("URI:", file.uri);
      console.log("Tipo:", file.mimeType);
      console.log("Tamaño:", file.size);
    } catch (error) {
      console.log("Error seleccionando archivo:", error);
    }
  };

  const handleActionPress = async () => {
    if (hasText) {
      console.log("Enviar mensaje:", text);
      setText("");
      return;
    }

    if (!isRecording) {
      await startRecording();
      return;
    }

    const recording = await stopRecording();

    if (!recording) return;

    try {
      console.log("📤 Enviando audio al backend...");

      const response = await sendIngestAudio(recording.uri);

      console.log("✅ Respuesta ingest-audio:", response);

      if (Platform.OS === "android") {
        ToastAndroid.show(
          "Nota de audio guardada con éxito",
          ToastAndroid.SHORT
        );
      } else {
        Alert.alert("Nota de audio guardada con éxito");
      }
    } catch (error) {
      console.log("❌ Error enviando audio:", error);

      if (Platform.OS === "android") {
        ToastAndroid.show("Error enviando audio", ToastAndroid.SHORT);
      } else {
        Alert.alert("Error enviando audio");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Pressable style={styles.iconButton} onPress={pickFile}>
              <Paperclip size={20} color="#555" />
            </Pressable>

            <TextInput
              placeholder="Mensaje"
              placeholderTextColor="#777"
              style={styles.input}
              value={text}
              onChangeText={setText}
              multiline={false}
            />
          </View>

          <Pressable
            onPress={handleActionPress}
            style={[
              styles.actionButton,
              hasText
                ? styles.sendButton
                : isRecording
                ? styles.recordingButton
                : styles.micButton,
            ]}
          >
            {hasText || isRecording ? (
              <Send size={20} color="#fff" />
            ) : (
              <Mic size={20} color="#fff" />
            )}
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  container: {
    width: BAR_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 30,
    padding: 6,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 45,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 6,
  },
  iconButton: {
    padding: 6,
  },
  actionButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  micButton: {
    backgroundColor: "#25D366",
  },
  sendButton: {
    backgroundColor: "#25D366",
  },
  recordingButton: {
    backgroundColor: "#E53935",
  },
});
