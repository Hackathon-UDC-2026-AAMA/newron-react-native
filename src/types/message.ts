import { File } from "expo-file-system";
import { Recording } from "./recording";
import { DocumentFile } from "./document";

type MessageType = "Text" | "Link" | "File" | "Audio";

export interface Message {
  id: string;
  type: MessageType;
  data: string | Recording | DocumentFile;
  timestamp: number;
}
