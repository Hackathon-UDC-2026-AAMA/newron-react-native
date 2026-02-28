import { ScreenContainer } from "@/components/ui/screen-container";
import { Heading } from "@/components/ui/heading";
import { FlatList, View, StyleSheet } from "react-native";
import { textMessageMocks } from "@/__MOCKS__/message-mocks";
import { renderItem } from "./components/message-render-item";
import { NoteBar } from "@/components/ui/noteBar";

export const NotesScreen = () => {
  const messages = textMessageMocks;

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

const styles = StyleSheet.create({
  separator: {
    height: 16,
  },
});
