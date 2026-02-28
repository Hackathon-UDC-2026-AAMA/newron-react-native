import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export interface Category {
  id: string;
  content: string;
}

interface CategoryElementProps {
  category: Category;
  backgroundColor: string;
}

export const CategoryElement: React.FC<CategoryElementProps> = ({
  category,
  backgroundColor,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>{category.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    margin: 4,
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
});