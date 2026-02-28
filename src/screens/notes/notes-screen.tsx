import { ScreenContainer } from "@/components/ui/screen-container";
import { Heading } from "@/components/ui/heading";
import { FlatList, View, StyleSheet } from "react-native";
import { textMessageMocks } from "@/__MOCKS__/message-mocks";
import { renderItem } from "./components/message-render-item";
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
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
      <NoteBar />
    </ScreenContainer>
  );
};
function setGroupedItems(grouped: Record<number, Item[]>) {
  throw new Error("Function not implemented.");
}


const styles = StyleSheet.create({
  separator: {
    height: 16,
  },
});
