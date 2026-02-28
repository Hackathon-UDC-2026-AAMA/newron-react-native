import { Message } from "@/types/message";
import { TextMessage } from "./messages/text-message";
import { FileMessage } from "./messages/file-message";
import { File } from "expo-file-system";
import { DocumentFile } from "@/types/document";

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
    // TODO: Implement
  }
  return null;
};
