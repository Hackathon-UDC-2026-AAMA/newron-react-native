import { parseTimestampToDate } from "@/utils/date-utils";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

interface Props extends PropsWithChildren {
  color: string;
  timestamp: number;
}
export const MessageCard = ({ children, color, timestamp }: Props) => {
  const { colors } = useTheme();
  return (
    <Card style={{ backgroundColor: color }}>
      <Card.Content>
        {children}
        <View style={{ marginTop: 16, alignItems: "flex-end" }}>
          <Text style={{ color: colors.secondary, opacity: 0.8 }}>
            {parseTimestampToDate(timestamp)}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};
