import { MD3DarkTheme } from "react-native-paper";

export const customTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: "#333333",
    //onSurface: "#FFFFFF", Text color
  },
  fonts: {
    ...MD3DarkTheme.fonts,
  },
  roundness: 2,
};
