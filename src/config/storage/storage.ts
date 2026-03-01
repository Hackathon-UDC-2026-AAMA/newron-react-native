import { Recording } from "@/types/recording";
import { StorageWrapper } from "./storage-wrapper";
import { Message } from "@/types/message";

const KEYS = {
  recordings: "recordings",
  messages: "messages",
  apiUrl: "api-url",
};

export const AppStore = {
  recordings: new StorageWrapper<Recording[]>(KEYS.recordings),
  messages: new StorageWrapper<Message[]>(KEYS.messages),
};
