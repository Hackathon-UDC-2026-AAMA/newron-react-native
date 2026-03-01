import { MessageCard, MessageCardProps } from "./message-card";
import { useTheme, Text } from "react-native-paper";
import { FileText } from "lucide-react-native";
import { DocumentFile } from "@/types/document";

interface Props extends MessageCardProps {
  content: DocumentFile;
}

export const FileMessage = ({ content, color, timestamp }: Props) => {
  const { colors } = useTheme();

  return (
    <MessageCard
      color={color}
      timestamp={timestamp}
      icon={
        <FileText
          size={20}
          color={colors.surfaceVariant}
          style={{ opacity: 0.9 }}
        />
      }
    >
      <Text style={{ color: colors.onSurfaceVariant, opacity: 0.8 }}>
        {content.name}
      </Text>
    </MessageCard>
  );
};
