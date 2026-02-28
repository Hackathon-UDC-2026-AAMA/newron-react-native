import { ScreenContainer } from "@/components/ui/screen-container";
import { Text, useTheme } from "react-native-paper";
import { MessageCard } from "./components/messages/message-card";
import { Heading } from "@/components/ui/heading";
import { NoteBar } from "@/components/ui/noteBar";
import { getItems, groupItemsByCluster, Item } from "@/API/itemService";
import { getClusters } from "@/API/clusterService";
import { useEffect } from "react";

export const NotesScreen = () => {
  const { colors } = useTheme();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await getItems();
        const clustersResponse = await getClusters();



        console.log("items:", itemsResponse);
        console.log("clusters:", clustersResponse);
        console.log("lista ordenada:", groupItemsByCluster(itemsResponse));
      } catch (error) {
        console.log("Error cargando datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScreenContainer>
      <Heading style={{ marginBottom: 16 }}>My notes</Heading>
      <NoteBar />
      <MessageCard color={"#FFFFFF"} timestamp={Date.now()}>
        <Text style={{ color: colors.onSurfaceVariant }}>
          This is veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery
          looooooooooooooooooong message
        </Text>
      </MessageCard>
    </ScreenContainer>
  );
};
function setGroupedItems(grouped: Record<number, Item[]>) {
  throw new Error("Function not implemented.");
}

