import React, { useState } from "react";
import { View, StyleSheet, Pressable, Modal } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Cable } from "lucide-react-native";
import { useBackendConnection } from "@/hooks/useBackendConnection";
import { ScanQR } from "./scan_qr";


export const TopBar = () => {
  const { colors } = useTheme();
  const { connected, checking } = useBackendConnection();

  const [showQR, setShowQR] = useState(false);

  const handlePress = () => {
    setShowQR(true); 
  };

  return (
    <>
      <View style={styles.wrapper}>
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
          <View style={styles.container}>
            
            <View style={styles.leftSection}>
              <Text style={[styles.title, { color: colors.onSurface }]}>
                Estado:
              </Text>

              {checking ? (
                <Text style={{ color: colors.onSurface }}>
                  Comprobando...
                </Text>
              ) : (
                <Text
                  style={{
                    color: connected ? "#4CAF50" : "#F44336",
                    fontWeight: "600",
                  }}
                >
                  {connected ? "Conectado" : "Sin conexión"}
                </Text>
              )}
            </View>

            <Pressable style={styles.button} onPress={handlePress}>
              <Cable size={22} color={colors.onSurface} />
            </Pressable>

          </View>
        </SafeAreaView>
      </View>

      {/* 🔥 Modal para ScanQR */}
      <Modal visible={showQR} animationType="slide">
        <ScanQR />
        <Pressable
          style={styles.closeOverlay}
          onPress={() => setShowQR(false)}
        >
          <Text style={{ color: "#fff" }}>Cerrar</Text>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  safeArea: {
    backgroundColor: "rgba(200, 200, 200, 0.2)",
  },
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    padding: 6,
  },
  closeOverlay: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 8,
  },
});