import apiClient from "./client";

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


export const sendIngest = async (
  input: string
): Promise<IngestResponse> => {
  try {
    const { data } = await apiClient.post<IngestResponse>(
      "/ingest",
      { input }
    );

    return data;
  } catch (error: any) {
    console.log(
      "❌ Error en ingest:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const sendIngestAudio = async (
  uri: string
): Promise<IngestAudioResponse> => {
  try {
    const formData = new FormData();

    const fileName = uri.split("/").pop() || "audio.m4a";

    formData.append("file", {
      uri,
      name: fileName,
      type: "audio/m4a",
    } as any);

    const { data } = await apiClient.post<IngestAudioResponse>(
      "/ingest-audio",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error: any) {
    console.log(
      "❌ Error en ingest-audio:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const sendIngestFile = async (
  uri: string
): Promise<IngestFileResponse> => {
  try {
    const formData = new FormData();

    const fileName = uri.split("/").pop() || "document.pdf";
    const extension = fileName.split(".").pop()?.toLowerCase();

    let mimeType = "application/pdf";

    if (extension === "txt") {
      mimeType = "text/plain";
    } else if (extension === "md" || extension === "markdown") {
      mimeType = "text/markdown";
    }

    formData.append("file", {
      uri,
      name: fileName,
      type: mimeType,
    } as any);

    const { data } = await apiClient.post<IngestFileResponse>(
      "/ingest-file",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error: any) {
    console.log(
      "❌ Error en ingest-file:",
      error.response?.data || error.message
    );
    throw error;
  }
};