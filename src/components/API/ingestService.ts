import apiClient from "./client";

export const sendIngest = async (input) => {
  try {
    const response = await apiClient.post("/ingest", {
      input: input,
    });

    return response.data; 
  } catch (error) {
    throw error;
  }
};