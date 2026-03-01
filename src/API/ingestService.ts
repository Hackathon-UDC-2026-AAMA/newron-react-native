import { getApiClient } from "@/API/client";
import { DocumentFile } from "@/types/document";

import * as FileSystem from "expo-file-system/legacy";

export interface IngestRequest {
  input: string;
}

export interface IngestResponse {
  id: number;
  type: string;
  cluster_id: number;
  similarity_score: number;
}

export interface IngestAudioResponse {
  filename: string;
  transcription: string;
  result: {
    id: number;
    type: string;
    cluster_id: number;
    similarity_score: number;
  };
  status: string;
}

export interface IngestFileResponse {
  filename: string;
  file_title: string;
  file_id: string;
  extracted_chars: number;
  index_chars: number;
  result: {
    id: number;
    type: string;
    cluster_id: number;
    similarity_score: number;
  };
  status: string;
}

export const sendIngest = async (input: string): Promise<IngestResponse> => {
  try {
    const apiClient = await getApiClient();

    const { data } = await apiClient.post<IngestResponse>("/ingest", { input });

    return data;
  } catch (error: any) {
    console.log("❌ Error en ingest:", error.response?.data || error.message);
    throw error;
  }
};

export const sendIngestMultiple = async (
  inputs: { input: string }[], // Accept an array of objects with 'input' as a string
): Promise<IngestResponse> => {
  try {
    const apiClient = await getApiClient();

    const textArr = inputs.map((input) => {
      return input.input;
    });
    console.log("===============", textArr);
    // Send a POST request with the array of objects
    const { data } = await apiClient.post<IngestResponse>("/ingest", {
      input: textArr,
    });

    return data;
  } catch (error: any) {
    // Log the error message or response data if it exists
    console.log("❌ Error en ingest:", error.response?.data || error.message);
    throw error;
  }
};

export const sendIngestAudio = async (
  uri: string,
): Promise<IngestAudioResponse> => {
  try {
    const apiClient = await getApiClient();

    const formData = new FormData();

    const fileName = uri.split("/").pop() || "audio.m4a";

    formData.append("file", {
      uri,
      name: fileName,
      type: "audio/m4a",
    } as any);
    //console.log("'''''''''''''''''''''FormData", formData, uri);
    const { data } = await apiClient.post<IngestAudioResponse>(
      "/ingest-audio",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  } catch (error: any) {
    console.log(
      "❌ Error en ingest-audio:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

/*
export const sendIngestFile = async (file: {
  uri: string; // ej: file:///...
  name: string; // ej: "document.pdf"
  type: string; // ej: "application/pdf"
}) => {
  const formData = new FormData();

  formData.append("file", {
    uri: file.uri,
    name: file.name,
    type: file.type,
  } as any);
  console.log("aaa", formData);
  const { data } = await apiClient.post("/ingest-file", formData, {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};
*/

export const sendIngestFile = async (file: {
  // Accept either base64 or a uri (RN-style)
  file?: string; // base64 string
  uri?: string; // file://... or content://...
  name?: string;
  type?: string;
}): Promise<IngestFileResponse> => {
  const apiClient = await getApiClient();
  const formData = new FormData();
  let tmpPath: string | undefined;

  const inferExtension = (name?: string, type?: string) => {
    if (name) {
      const ext = name.split(".").pop()?.toLowerCase();
      if (ext) return ext;
    }
    if (!type) return "bin";
    if (type.includes("pdf")) return "pdf";
    if (type.includes("msword") || type.includes("word")) return "doc";
    if (type.includes("officedocument.wordprocessingml")) return "docx";
    if (type.includes("text")) return "txt";
    return "bin";
  };

  try {
    if (file.uri) {
      // RN-friendly append: an object with uri/name/type
      const name = file.name ?? file.uri.split("/").pop() ?? "file";
      const type = file.type ?? "application/pdf";
      formData.append("file", { uri: file.uri, name, type } as any);
    } else if (file.file) {
      // Clean base64 (remove data URI header and whitespace/newlines)
      let base64Data = file.file;
      if (base64Data.includes("base64,")) {
        base64Data = base64Data.split("base64,")[1];
      }
      base64Data = base64Data.replace(/\s/g, "");

      // Write a temporary file in cache and append its uri to FormData
      const ext = inferExtension(file.name, file.type);
      tmpPath = `${FileSystem.cacheDirectory}ingest-file-${Date.now()}.${ext}`;
      await FileSystem.writeAsStringAsync(tmpPath, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const name = file.name ?? "file.pdf";
      const type = file.type ?? "application/pdf";
      formData.append("file", { uri: tmpPath, name, type } as any);
    } else {
      throw new Error("No file provided to sendIngestFile");
    }

    const { data } = await apiClient.post<IngestFileResponse>(
      "/ingest-file",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  } catch (error: any) {
    console.log(
      "❌ Error en ingest-file:",
      error.response?.data || error.message,
    );
    throw error;
  } finally {
    // cleanup tmp file if created
    if (tmpPath) {
      try {
        await FileSystem.deleteAsync(tmpPath, { idempotent: true });
      } catch {
        // ignore cleanup errors
      }
    }
  }
};
