import { customTheme } from "@/config/theme";
import { PaperProvider } from "react-native-paper";
import { TabNavigator } from "@/routing/tab-navigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <PaperProvider theme={customTheme}>
      <SafeAreaProvider>
        <TabNavigator />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
