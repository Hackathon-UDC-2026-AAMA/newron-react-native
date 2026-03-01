import { customTheme } from "@/config/theme";
import { PaperProvider } from "react-native-paper";
import { TabNavigator } from "@/routing/tab-navigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MessageProvider } from "@/context/message-context";
import { useEffect, useState } from "react";
import { AppStore } from "@/config/storage/storage";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cleanup = async () => {
      try {
        await AppStore.messages.deleteAll();
      } catch (e) {
        console.warn("Error during storage cleanup:", e);
      } finally {
        setReady(true);
      }
    };

    cleanup();
  }, []);

  // Wait until cleanup completes before rendering providers that read storage to avoid races
  if (!ready) return null;

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
