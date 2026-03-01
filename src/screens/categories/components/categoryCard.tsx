import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface CategoryCardProps {
  title: string;
  description: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: colors.primary },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.description,
          { color: colors.onSurfaceVariant },
        ]}
      >
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "50%",
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});