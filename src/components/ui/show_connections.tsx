import { View, Text } from "react-native";
import { useBackendConnection } from "@/hooks/useBackendConnection";

export const BackendStatus = () => {
  const { connected, checking } = useBackendConnection();

  if (checking) {
    return <Text>Comprobando conexión...</Text>;
  }

  return (
    <View>
      <Text>
        {connected ? "🟢 Conectado al servidor" : "🔴 Sin conexión al servidor"}
      </Text>
    </View>
  );
};
