import { MessageCard, MessageCardProps } from "./message-card";
import { useTheme, Text } from "react-native-paper";
import { FileText } from "lucide-react-native";
import { DocumentFile } from "@/types/document";
import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import * as IntentLauncher from "expo-intent-launcher";

interface Props extends MessageCardProps {
  content: DocumentFile;
}

export const FileMessage = ({
  content,
  color,
  timestamp,
  synchronized,
}: Props) => {
  const { colors } = useTheme();

  const handleOpenFile = async () => {
    try {
      const filePath = content.path;

      if (Platform.OS === "ios") {
        await Sharing.shareAsync(filePath, {
          UTI: "com.adobe.pdf",
          mimeType: "application/pdf",
        });
      } else {
        const contentUri = await FileSystem.getContentUriAsync(filePath);

        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: contentUri,
          flags: 1,
          type: "application/pdf",
        });
      }
    } catch (error) {
      console.error("Error al abrir el archivo:", error);
      Alert.alert(
        "Error",
        "No se pudo abrir el archivo. Asegúrate de tener un lector de PDF instalado.",
      );
    }
  };

  const fileName = content.path.split("/").pop() || "Archivo PDF";

  return (
    <TouchableOpacity
      onPress={handleOpenFile}
      activeOpacity={0.7}
      style={{ marginVertical: 4 }}
    >
      <MessageCard
        synchronized={synchronized}
        color={color}
        timestamp={timestamp}
        icon={
          <FileText
            size={20}
            color={colors.surfaceVariant}
            style={{ opacity: 0.9 }}
          />
        }
      >
        <Text
          numberOfLines={1}
          style={{
            color: colors.onSurfaceVariant,
            fontWeight: "500",
            textDecorationLine: "underline",
          }}
        >
          {fileName}
        </Text>
      </MessageCard>
    </TouchableOpacity>
  );
};
