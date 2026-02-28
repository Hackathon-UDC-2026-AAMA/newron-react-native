import { File } from "expo-file-system";
import { Recording } from "./recording";

type MessageType = "Text" | "Link" | "File" | "Audio";

export interface Message {
  id: string;
  type: MessageType;
  data: string | Recording | File;
  timestamp: number;
}
