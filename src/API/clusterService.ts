import apiClient from "./client";

export interface Cluster {
  id: number;
  cluster_label: string | null;
}

export const getClusters = async (): Promise<Cluster[]> => {
  try {
    const response = await apiClient.get<Cluster[]>("/clusters");

    
    const cleanedClusters = response.data.map(
      ({ centroid, ...rest }: any) => rest
    );

    return cleanedClusters as Cluster[];
  } catch (error: any) {
    console.log(
      "❌ Error obteniendo clusters:",
      error.response?.data || error.message
    );
    throw error;
  }
};