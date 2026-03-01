import { parseTimestampToDate } from "@/utils/date-utils";
import { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

export interface MessageCardProps extends PropsWithChildren {
  color?: string;
  timestamp: number;
  icon?: React.ReactNode;
  synchronized?: boolean;
}

export const MessageCard = ({
  children,
  color = "#FFFFFF",
  timestamp,
  icon,
  synchronized,
}: MessageCardProps) => {
  const { colors } = useTheme();

  return (
    <Card style={{ backgroundColor: color }}>
      <Card.Content>
        <View
          style={{
            height: 4,
            width: "100%",
            alignItems: "flex-end",
            marginBottom: 16,
          }}
        >
          <View
            style={{
              height: 12,
              width: 12,
              backgroundColor: synchronized ? "#4CAF50" : "#F44336",
              borderRadius: 8,
            }}
          />
        </View>
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
