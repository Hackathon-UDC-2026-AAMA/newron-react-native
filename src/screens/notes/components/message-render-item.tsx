import { Message } from "@/types/message";
import { TextMessage } from "./messages/text-message";

export const renderItem = ({ item }: { item: Message }) => {
  if (item.type === "Text") {
    return (
      <TextMessage
        key={item.id}
        content={item.data as string}
        timestamp={item.timestamp}
      />
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
    // TODO: Implement
  } else if (item.type === "Audio") {
    // TODO: Implement
  }
  return null;
};
