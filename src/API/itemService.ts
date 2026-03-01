import { getApiClient } from "./client";

export interface Item {
  id: number;
  type: string;
  cluster_id: number;
  similarity_score: number;
  created_at: string;
}

export const getItems = async (): Promise<Item[]> => {
  try {
    const apiClient = await getApiClient();

    const response = await apiClient.get<Item[]>("/items");

    const cleanedItems = response.data.map(
      ({ embedding, ...rest }: any) => rest
    );

    return cleanedItems as Item[];
  } catch (error: any) {
    console.log(
      "❌ Error obteniendo items:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const groupItemsByCluster = (items: Item[]) => {
  return items.reduce<Record<number, Item[]>>((acc, item) => {
    if (!acc[item.cluster_id]) {
      acc[item.cluster_id] = [];
    }

    acc[item.cluster_id].push(item);

    return acc;
  }, {});
};