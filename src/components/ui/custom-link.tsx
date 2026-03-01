import React from "react";
import { Text, TouchableWithoutFeedback, Alert } from "react-native";
import { useTheme } from "react-native-paper";
import { Linking } from "react-native";

interface CustomLinkProps {
  content: string;
  onPress?: () => void;
  isFile?: boolean;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  content,
  onPress,
  isFile,
}) => {
  const { colors } = useTheme();

  const handlePress = async () => {
    if (onPress) {
      onPress();
      return;
    }

    // URL Handling...
    if (content.startsWith("http")) {
      await Linking.openURL(content);
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
