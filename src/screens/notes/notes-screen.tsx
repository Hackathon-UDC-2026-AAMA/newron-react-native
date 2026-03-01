import { ScreenContainer } from "@/components/ui/screen-container";
import { Heading } from "@/components/ui/heading";
import { FlatList, View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { renderItem } from "./components/message-render-item";
import { NoteBar } from "@/components/ui/noteBar";
import {
  onDocumentMessage,
  onRecordingMessage,
  onTextMessage,
} from "./actions/message-actions";
import { useMessageContext } from "@/context/message-context";
import { PenOff } from "lucide-react-native";
<<<<<<< HEAD
import { getItems, groupItemsByCluster, Item } from "@/API/itemService";
import { getClusters } from "@/API/clusterService";
import { useEffect } from "react";
=======
import { SyncButton } from "./components/sync-button";
>>>>>>> origin/dev

export const NotesScreen = () => {
  const { colors } = useTheme();
  const { messages } = useMessageContext();
  
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
      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Heading>Mis notas</Heading>
        <SyncButton disabled={!messages || messages.length === 0} />
      </View>
      <FlatList
        data={messages}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              height: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PenOff
              size={38}
              color={colors.inversePrimary}
              style={{ marginBottom: 16 }}
            />
            <Heading
              variant="tertiary"
              style={{ color: colors.inversePrimary, textAlign: "center" }}
            >
              {"Todavía no hay notas,\n ¡Empieza a crearlas ahora!"}
            </Heading>
          </View>
        )}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          messages.length === 0 ? { height: "100%" } : undefined
        }
      />
      <NoteBar
        onTextMessage={onTextMessage}
        onDocumentMessage={onDocumentMessage}
        onRecordingMessage={onRecordingMessage}
      />
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
