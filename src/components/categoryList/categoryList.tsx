import React, { useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Category, CategoryElement } from "./categoryElement";

interface CategoryListProps {
  categories: Category[];
}

const COLORS = [
  "#4CAF50",
  "#2196F3",
  "#FF9800",
  "#9C27B0",
  "#F44336",
];

const SCREEN_WIDTH = Dimensions.get("window").width;
const CONTAINER_WIDTH = SCREEN_WIDTH * 0.8;

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
}) => {
  const coloredData = useMemo(() => {
    let lastColor: string | null = null;

    return categories.map((category) => {
      let availableColors = COLORS;

      if (lastColor) {
        availableColors = COLORS.filter((c) => c !== lastColor);
      }

      const randomColor =
        availableColors[
          Math.floor(Math.random() * availableColors.length)
        ];

      lastColor = randomColor;

      return {
        ...category,
        backgroundColor: randomColor,
      };
    });
  }, [categories]);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {coloredData.map((item) => (
          <CategoryElement
            key={item.id}
            category={item}
            backgroundColor={item.backgroundColor}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
  },
  container: {
    width: CONTAINER_WIDTH, 
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});