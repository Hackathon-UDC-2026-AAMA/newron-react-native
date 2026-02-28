import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from "react-native";
import { Mic, Send, Paperclip } from "lucide-react-native";
import * as DocumentPicker from "expo-document-picker";

const { width } = Dimensions.get("window");
const BAR_WIDTH = width * 0.9;

export const NoteBar: React.FC = () => {
    const [text, setText] = useState("");

    const hasText = text.trim().length > 0;

    const pickFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "*/*", // cualquier tipo de archivo
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
                        style={[
                            styles.actionButton,
                            hasText ? styles.sendButton : styles.micButton,
                        ]}
                    >
                        {hasText ? (
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
});