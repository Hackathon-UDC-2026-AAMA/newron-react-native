import { MD3DarkTheme, MD3Theme } from "react-native-paper";

export const customTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: "#1b1b1d",
    //onSurface: "#FFFFFF", Text color
    onSurfaceVariant: "#1b1b1d",
  },
  fonts: {
    ...MD3DarkTheme.fonts,
  },
  roundness: 2,
};
