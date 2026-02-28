import { Message } from "@/types/message";
import { MessageCard } from "./message-card";

interface Props {
  message: Message;
  color: string;
}
export const MessageItem = ({ message, color }: Props) => {
  //if (message.type === "Text") return <MessageCard color={color}></MessageCard>;
};
