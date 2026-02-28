import React from "react";
import { Text, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "react-native-paper";
import { Linking } from "react-native";

interface CustomLinkProps {
  content: string;
  onPress?: () => void;
}

const CustomLink: React.FC<CustomLinkProps> = ({ content, onPress }) => {
  const { colors } = useTheme();

  const handlePress = async () => {
    if (onPress) {
      onPress();
    } else if (content.startsWith("http") || content.startsWith("https")) {
      try {
        await Linking.openURL(content);
      } catch (error) {
        console.error("Failed to open URL:", error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Text style={{ color: colors.primary, textDecorationLine: "underline" }}>
        {content}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default CustomLink;
