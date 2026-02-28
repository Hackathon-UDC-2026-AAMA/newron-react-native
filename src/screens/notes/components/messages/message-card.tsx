import { parseTimestampToDate } from "@/utils/date-utils";
import { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

export interface MessageCardProps extends PropsWithChildren {
  color?: string;
  timestamp: number;
  icon?: React.ReactNode;
}

export const MessageCard = ({
  children,
  color = "#FFFFFF",
  timestamp,
  icon,
}: MessageCardProps) => {
  const { colors } = useTheme();

  return (
    <Card style={{ backgroundColor: color }}>
      <Card.Content>
        <View style={styles.row}>
          {icon && (
            <View style={styles.iconOuterContainer}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.primary },
                ]}
              >
                {icon}
              </View>
            </View>
          )}
          <View style={styles.textContainer}>
            {children}
            <View style={{ marginTop: 16, alignItems: "flex-end" }}>
              <Text style={{ color: colors.surfaceVariant, opacity: 0.4 }}>
                {parseTimestampToDate(timestamp)}
              </Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconOuterContainer: {
    height: "100%",
    justifyContent: "flex-start",
  },
  iconContainer: {
    marginRight: 12,
    padding: 8,
    borderRadius: 32,
  },
  textContainer: {
    flex: 1,
  },
});
