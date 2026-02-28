import { StyleProp, TextStyle } from "react-native";
import { Text, TextProps as PaperTextProps } from "react-native-paper";

type Variant = "main" | "secondary" | "tertiary";

interface HeadingProps extends PaperTextProps<Variant> {
  variant?: Variant;
}

export const Heading: React.FC<HeadingProps> = ({
  variant = "main",
  style,
  children,
  ...props
}) => {
  const textStyles = getTextStyles(variant);

  return (
    <Text {...props} style={[textStyles, style]}>
      {children}
    </Text>
  );
};

const getTextStyles = (variant: Variant): StyleProp<TextStyle> => {
  switch (variant) {
    case "main":
      return {
        fontSize: 36,
        fontWeight: "bold",
        lineHeight: 40,
      };
    case "secondary":
      return {
        fontSize: 30,
        fontWeight: "bold",
        lineHeight: 36,
      };
    case "tertiary":
      return {
        fontSize: 24,
        fontWeight: "normal",
        lineHeight: 28,
      };
    default:
      return {
        fontSize: 16,
        fontWeight: "normal",
        lineHeight: 24,
      };
  }
};
