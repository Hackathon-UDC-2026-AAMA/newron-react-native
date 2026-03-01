import { MessageCard, MessageCardProps } from "./message-card";
import { Text, useTheme } from "react-native-paper";
import CustomLink from "@/components/ui/custom-link";
import { Link2, TextInitial } from "lucide-react-native";

interface Props extends MessageCardProps {
  content: string;
  isLink?: boolean;
}

export const TextMessage = ({
  content,
  color,
  timestamp,
  isLink,
  synchronized,
}: Props) => {
  const { colors } = useTheme();

  return (
    <MessageCard
      synchronized={synchronized}
      color={color}
      timestamp={timestamp}
      icon={
        isLink ? (
          <Link2
            size={20}
            color={colors.surfaceVariant}
            style={{ opacity: 0.9 }}
          />
        ) : (
          <TextInitial
            size={20}
            color={colors.surfaceVariant}
            style={{ opacity: 0.9 }}
          />
        )
      }
    >
      {isLink ? (
        <CustomLink content={content} />
      ) : (
        <Text style={{ color: colors.onSurfaceVariant, opacity: 0.8 }}>
          {content}
        </Text>
      )}
    </MessageCard>
  );
};
