import { ScreenContainer } from "@/components/ui/screen-container";
import { Text, useTheme } from "react-native-paper";
import { MessageCard } from "./components/messages/message-card";
import { Heading } from "@/components/ui/heading";

export const NotesScreen = () => {
  const { colors } = useTheme();

  return (
    <ScreenContainer>
      <Heading style={{ marginBottom: 16 }}>My notes</Heading>
      <MessageCard color={"#FFFFFF"} timestamp={Date.now()}>
        <Text style={{ color: colors.onSurfaceVariant }}>
          This is veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery
          looooooooooooooooooong message
        </Text>
      </MessageCard>
    </ScreenContainer>
  );
};
