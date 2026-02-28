import { customTheme } from "@/config/theme";
import { PaperProvider } from "react-native-paper";
import { TabNavigator } from "@/routing/tab-navigator";

export default function RootLayout() {
  return (
    <PaperProvider theme={customTheme}>
      <TabNavigator />
    </PaperProvider>
  );
}
