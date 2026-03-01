import { Message } from "@/types/message";
import { TextMessage } from "./messages/text-message";
import { FileMessage } from "./messages/file-message";
import { File } from "expo-file-system";
import { DocumentFile } from "@/types/document";
import AudioMessage from "./messages/audio-message";
import { Recording } from "@/types/recording";

export const renderItem = ({ item }: { item: Message }) => {
  if (item.type === "Text") {
    return (
      <TextMessage content={item.data as string} timestamp={item.timestamp} />
    );
  } else if (item.type === "Link") {
    return (
      <TextMessage
        content={item.data as string}
        timestamp={item.timestamp}
        isLink
      />
    );
  } else if (item.type === "File") {
    return (
      <FileMessage
        key={item.id}
        content={item.data as DocumentFile}
        timestamp={item.timestamp}
      />
    );
  } else if (item.type === "Audio") {
    return (
      <AudioMessage
        key={item.id}
        audioUri={(item.data as Recording).path}
        duration={item.timestamp}
      />
    );
  }
  return null;
};
