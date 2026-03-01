import { AppStore } from "@/config/storage/storage";
import { DocumentFile } from "@/types/document";
import { Message } from "@/types/message";
import { Recording } from "@/types/recording";

export const onTextMessage = async (content: string) => {
  const urlPattern = /^(https?:\/\/[^\s]+)$/;

  const messages = await AppStore.messages.getItem();

  let messageList: Message[] = [];
  let newMessage: Message;

  if (urlPattern.test(content.trim())) {
    newMessage = {
      id: Date.now().toString(),
      type: "Link",
      data: content,
      timestamp: Date.now(),
    };
  } else {
    newMessage = {
      id: Date.now().toString(),
      type: "Text",
      data: content,
      timestamp: Date.now(),
    };
  }

  if (messages) {
    messageList = [...messages, newMessage];
  } else messageList = [newMessage];

  return messageList;
};

export const onDocumentMessage = async (documentFile: DocumentFile) => {
  const messages = await AppStore.messages.getItem();

  let messageList: Message[] = [];
  let newMessage: Message;

  newMessage = {
    id: Date.now().toString(),
    type: "File",
    data: documentFile,
    timestamp: Date.now(),
  };

  if (messages) {
    messageList = [...messages, newMessage];
  } else messageList = [newMessage];

  return messageList;
};

export const onRecordingMessage = async (audio: Recording) => {
  const messages = await AppStore.messages.getItem();

  let messageList: Message[] = [];
  let newMessage: Message;

  newMessage = {
    id: Date.now().toString(),
    type: "Audio",
    data: audio,
    timestamp: Date.now(),
  };

  if (messages) {
    messageList = [...messages, newMessage];
  } else messageList = [newMessage];

  return messageList;
}
