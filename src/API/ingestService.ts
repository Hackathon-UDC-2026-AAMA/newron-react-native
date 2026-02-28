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