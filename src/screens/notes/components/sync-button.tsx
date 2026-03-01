import { sendIngestFile, sendIngestMultiple } from "@/API/ingestService";
import { AppStore } from "@/config/storage/storage";
import { useMessageContext } from "@/context/message-context";
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

  const { setMessages } = useMessageContext();

  const handleSync = async () => {
    setIsLoading(true);

    const messages = await AppStore.messages.getItem();

    if (!messages) {
      setIsLoading(false);
      return; // TODO: Toast no hay mensajes
    }

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

        try {
          // Prefer sending the file URI when available (RN-friendly). Fall back to base64.
          const payload: any = {};
          if (fileDocument.path) {
            payload.uri = normalizeFileUri(fileDocument.path);
          }
          if (fileDocument.base64) {
            payload.file = fileDocument.base64;
          }
          if (fileDocument.name) {
            payload.name = fileDocument.name;
          }
          payload.type = toMimeType(fileDocument.name, fileDocument.extension);

          // If neither uri nor base64 exists, skip this file and log
          if (!payload.uri && !payload.file) {
            console.warn(
              "Skipping file sync, no uri or base64 available:",
              fileDocument,
            );
            continue;
          }

          await sendIngestFile(payload);
          console.log("File successfully ingested:", fileDocument.name);
        } catch (error) {
          console.error("Error sending file:", fileDocument.name, error);
        }
      }
    }

    const processedMessages = messages.map((message) => ({
      ...message,
      processed: true,
    }));

    await AppStore.messages.setItem(processedMessages);

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
