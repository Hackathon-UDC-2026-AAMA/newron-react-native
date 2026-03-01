import apiClient, { getApiClient } from '@/API/client';
import { DocumentFile } from '@/types/document';


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

export const sendIngestFile = async (
  file: DocumentFile
): Promise<IngestResponse> => {
  const apiClient = await getApiClient();

  const formData = new FormData();

    formData.append("file", {
      uri: file.file.path,
      name: "test",
      type: "*/*",
    } as any);

  //console.log("============>FORMDATA", formData, file.file.path);
  const headers= {
      headers:{
        "Content-Type": "application/x-www-form-url-encoded",
      }
    }
  
  try {
    const { data } = await apiClient.post("/ingest", formData, headers);

    return data;
  } catch (error: any) {
    console.log("❌ Error en ingest:", error.response?.data || error.message);
    throw error;
  }
};
