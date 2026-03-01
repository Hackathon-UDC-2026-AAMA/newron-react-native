import { customTheme } from "@/config/theme";
import { PaperProvider } from "react-native-paper";
import { TabNavigator } from "@/routing/tab-navigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MessageProvider } from "@/context/message-context";

export default function RootLayout() {
  return (
    <PaperProvider theme={customTheme}>
      <MessageProvider>
        <SafeAreaProvider>
          <TabNavigator />
        </SafeAreaProvider>
      </MessageProvider>
    </PaperProvider>
  );
}
