import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  Alert,
  TouchableOpacity,
  Animated,
  Keyboard,
} from "react-native";
import { Mic, Send, Paperclip, Voicemail } from "lucide-react-native";
import { useAudioRecorderHook } from "../voiceRecord/useAudioRecorderHook";
import { sendIngestAudio, sendIngestFile } from "@/API/ingestService";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import { Text, useTheme } from "react-native-paper";
import { useMessageContext } from "@/context/message-context";
import { Message } from "@/types/message";
import { DocumentFile } from "@/types/document";
import { Recording } from "@/types/recording";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppStore } from "@/config/storage/storage";
import { useShareIntent } from "expo-share-intent";

interface Props {
  onTextMessage?: (content: string) => Promise<Message[]>;
  onDocumentMessage?: (document: DocumentFile) => Promise<Message[]>;
  onRecordingMessage?: (recording: Recording) => Promise<Message[]>;
}

export const NoteBar = ({
  onTextMessage,
  onDocumentMessage,
  onRecordingMessage,
}: Props) => {
  const { setMessages } = useMessageContext();
  const { colors } = useTheme();
  const [text, setText] = useState("");

  const { startRecording, stopRecording, isRecording } = useAudioRecorderHook();
  const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntent();

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

  // Use useRef for animated values to avoid re-instantiation on renders
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRecording) {
      Animated.parallel([
        Animated.loop(
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 1.2,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 0.5,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
        ),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isRecording]);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // You can also restrict this to specific types (e.g., "application/pdf")
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) return;

      const file = result.assets[0];

      // Check if the file is already base64-encoded
      if (file.base64) {
        // Use the base64 from the file directly
        const base64 = file.base64;
        console.log("Base64 found:", base64);

        // Send the base64 data
        if (onDocumentMessage) {
          const newMessages = await onDocumentMessage({
            base64,
            path: file.uri,
          });
          setMessages(newMessages);
        }
      } else {
        // If no base64, read the file content manually as base64
        const base64 = await FileSystem.readAsStringAsync(file.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        console.log("Manually read base64:", base64);

        // Send the base64 data
        if (onDocumentMessage) {
          const newMessages = await onDocumentMessage({
            base64,
            path: file.uri,
          });
          setMessages(newMessages);
        }
      }

      // Log file details
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
    Keyboard.dismiss();

    if (hasText) {
      if (onTextMessage) {
        const newMessages = await onTextMessage(text);
        setMessages(newMessages);
      }
      setText("");
      return;
    }

    if (!isRecording) {
      await startRecording();
      return;
    }
    if (!isRecording) {
      await startRecording();
      return;
    }

    const recording = await stopRecording();

    if (!recording) return;

    try {
      const base64Content = await FileSystem.readAsStringAsync(recording.uri, {
        encoding: "base64",
      });

      const newAudioNote = {
        id: Date.now().toString(),
        path: recording.uri,
        base64: base64Content,
        type: "audio",
      };

      if (onRecordingMessage) {
        const newMessages = await onRecordingMessage(newAudioNote);
        setMessages(newMessages);
      }

      const response = await sendIngestAudio(recording.uri);
      console.log("Ingest response:", response);

      const existingNotesJSON = await AsyncStorage.getItem("@audio_notes");
      const existingNotes = existingNotesJSON
        ? JSON.parse(existingNotesJSON)
        : [];

      const updatedNotes = [...existingNotes, newAudioNote];
      await AsyncStorage.setItem("@audio_notes", JSON.stringify(updatedNotes));

      const successMsg = "Audio guardado localmente";
      Platform.OS === "android"
        ? ToastAndroid.show(successMsg, ToastAndroid.SHORT)
        : Alert.alert("Éxito", successMsg);
    } catch (error) {
      console.error("Error al guardar en Storage:", error);
      const errorMsg = "Error al guardar el audio localmente";
      Platform.OS === "android"
        ? ToastAndroid.show(errorMsg, ToastAndroid.SHORT)
        : Alert.alert("Error", errorMsg);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.mainContainer}
    >
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            {!isRecording && (
              <TouchableOpacity style={styles.iconButton} onPress={pickFile}>
                <Paperclip size={20} color="#555" />
              </TouchableOpacity>
            )}

            {isRecording ? (
              <Animated.Text
                style={[
                  { color: "#E53935", fontSize: 16, fontWeight: "600" },
                  { opacity },
                ]}
              >
                Recording...
              </Animated.Text>
            ) : (
              <TextInput
                placeholder="Introduce tu nota"
                placeholderTextColor="#777"
                style={styles.input}
                value={text}
                onChangeText={setText}
                multiline
                editable={!isRecording}
              />
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleActionPress}
            style={[
              styles.actionButton,
              { backgroundColor: isRecording ? "#E53935" : colors.primary },
            ]}
          >
            <Animated.View style={{ transform: [{ scale }] }}>
              {hasText ? (
                <Send size={20} color={colors.surface} />
              ) : !isRecording ? (
                <Mic size={20} color={colors.surface} />
              ) : (
                <Voicemail size={20} color={colors.surface} />
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { backgroundColor: "transparent" },
  outerContainer: { alignItems: "center", paddingVertical: 10 },
  container: {
    width: "95%",
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
    paddingHorizontal: 12,
    minHeight: 45,
  },
  input: { flex: 1, fontSize: 16, paddingVertical: 8, color: "#000" },
  iconButton: { padding: 6 },
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
