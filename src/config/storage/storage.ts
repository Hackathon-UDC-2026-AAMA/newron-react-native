import { Recording } from "@/types/recording";
import { StorageWrapper } from "./storage-wrapper";

const KEYS = {
  recordings: "recordings",
  messages: "messages",
  apiUrl: "api-url",
};

export const AppStore = {
  recordings: new StorageWrapper<Recording[]>(KEYS.recordings),
  messages: new StorageWrapper<string[]>(KEYS.messages),
};
