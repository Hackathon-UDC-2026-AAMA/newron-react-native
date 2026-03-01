import apiClient from "@/API/client";
import { sendIngestFile, sendIngestMultiple } from "@/API/ingestService";
import { AppStore } from "@/config/storage/storage";
import { DocumentFile } from "@/types/document";
import { Message } from "@/types/message";
import { CloudSync } from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";

interface Props {
  disabled?: boolean;
}
export const SyncButton = ({ disabled }: Props) => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSync = async () => {
    setIsLoading(true);

    const messages = await AppStore.messages.getItem();

    if (!messages) return; // TODO: Toast no hay mensajes

    const unprocessedMessages = messages.filter(
      (message) => !message.processed,
    );

    let textMessages: { input: string }[] = [];
    let fileMessages: Message[] = [];

    textMessages = unprocessedMessages
      .filter((message) => message.type === "Text" || message.type === "Link")
      .map((message) => ({
        input: message.data as string,
      }));

    fileMessages = unprocessedMessages.filter(
      (message) => message.type === "File",
    );

    if (textMessages && textMessages.length > 0) {
      try {
        await sendIngestMultiple(textMessages);
      } catch (error) {
        console.error("Error sending text:", error);
      }
      // TODO: Add toast
    }

    if (fileMessages && fileMessages.length > 0) {
      for (const file of fileMessages) {
        const fileDocument = file.data as DocumentFile;

        console.log(
          "=================????????> FILE",
          fileDocument.extension,
          fileDocument.name,
          fileDocument.path,
        );
        try {
          await sendIngestFile({
            name: fileDocument.name ?? "upload.bin",
            uri: normalizeFileUri(fileDocument.path),
            type: toMimeType(fileDocument.name, fileDocument.extension),
          });
          console.log("File successfully ingested:", fileDocument.name);
        } catch (error) {
          console.error("Error sending file:", fileDocument.name, error);
        }
      }
    }
    setIsLoading(false);
  };
  return (
    <Pressable
      onPress={handleSync}
      style={{
        height: 36,
        backgroundColor: colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 8,
      }}
      disabled={disabled}
    >
      <View
        style={{
          flex: 1,
          gap: 6,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!isLoading ? (
          <>
            <CloudSync />
            <Text style={{ fontSize: 16, color: colors.surface }}>
              Sincronizar
            </Text>
          </>
        ) : (
          <View>
            <ActivityIndicator color="white" size={"small"} />
          </View>
        )}
      </View>
    </Pressable>
  );
};

const normalizeFileUri = (path: string) =>
  path.startsWith("file://") ? path : `file://${path}`;

const toMimeType = (name?: string, extension?: string) => {
  const extFromName = name?.split(".").pop()?.toLowerCase();
  const ext = (extFromName || extension || "").replace(".", "").toLowerCase();

  const map: Record<string, string> = {
    pdf: "application/pdf",
  };
  return map[ext] ?? "application/octet";
};
