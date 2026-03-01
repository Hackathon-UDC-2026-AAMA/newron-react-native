import { ScreenContainer } from "@/components/ui/screen-container";
import { Heading } from "@/components/ui/heading";
import { FlatList, View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { renderItem } from "./components/message-render-item";
import { NoteBar } from "@/components/ui/noteBar";
import { onDocumentMessage, onTextMessage } from "./actions/message-actions";
import { useMessageContext } from "@/context/message-context";
import { PenOff } from "lucide-react-native";

export const NotesScreen = () => {
  const { messages } = useMessageContext();
  const { colors } = useTheme();

  return (
    <ScreenContainer>
      <Heading style={{ marginBottom: 16 }}>Mis notas</Heading>
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
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 16,
  },
});
