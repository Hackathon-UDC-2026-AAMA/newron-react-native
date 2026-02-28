import { ScreenContainer } from "@/components/ui/screen-container";
import { Heading } from "@/components/ui/heading";
import { FlatList, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { renderItem } from "./components/message-render-item";
import { NoteBar } from "@/components/ui/noteBar";
import { onDocumentMessage, onTextMessage } from "./actions/message-actions";
import { useMessageContext } from "@/context/message-context";

export const NotesScreen = () => {
  const { messages } = useMessageContext();

  return (
    <ScreenContainer>
      <Heading style={{ marginBottom: 16 }}>My notes</Heading>
      <FlatList
        data={messages}
        ListEmptyComponent={() => <Text>Any note has been created yet!</Text>}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
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
