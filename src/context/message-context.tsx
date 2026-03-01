// context/MessageContext.tsx
import { AppStore } from "@/config/storage/storage";
import { Message } from "@/types/message";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface MessageContextType {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const loadMessagesFromStore = async () => {
      const storedMessages = await AppStore.messages.getItem();
      if (storedMessages) {
        setMessages(storedMessages);
      }
    };
    loadMessagesFromStore();
  }, []);

  useEffect(() => {
    const saveMessagesToStore = async () => {
      await AppStore.messages.setItem(messages);
    };
    saveMessagesToStore();
  }, [messages]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageContext");
  }
  return context;
};
