import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { CameraView, useCameraPermissions } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ScanQR = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const connectToServer = async ({ ip, token }) => {
    try {
      const url = `http://${ip}:8000/pair?secret=${encodeURIComponent(token)}`;

      console.log(`Intentando conectar a ${url}...`);

      const res = await fetch(url, {
        method: "POST",
      });

      if (!res.ok) {
        const errorDetail = await res.json();
        console.log("Detalle del error:", errorDetail);
        throw new Error("Pairing failed");
      }

      const data = await res.json();
      console.log("Connected!", data);
      alert("¡Vinculado correctamente!");
    } catch (error) {
      console.error("Connection error:", error);
      alert(
        "No se pudo conectar con el servidor. Revisa que estés en el mismo WiFi."
      );
    }
  };

  const handleScan = async ({ data }) => {
    try {
      const parsed = JSON.parse(data);
      const ip = parsed.ip;
      const token = parsed.token;

      await AsyncStorage.setItem("server_ip", ip);
      await AsyncStorage.setItem("auth_token", token);

      await connectToServer({ ip, token });

      setScanned(true);
      setShowCamera(false);
    } catch (err) {
      alert("QR inválido o error de conexión");
      console.error(err);
      setScanned(false);
    }
  };

  if (!permission)
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 20 }}>
          Necesitamos permiso para usar la cámara
        </Text>
        <Button mode="contained" onPress={requestPermission}>
          Permitir cámara
        </Button>
      </View>
    );
  }

  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={StyleSheet.absoluteFill} // Esto asegura que llene todo el espacio
          facing="back" // Especificamos la cámara trasera
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={scanned ? undefined : handleScan}
        />
        {/* Botón opcional para cerrar la cámara si el usuario se arrepiente */}
        <Button
          mode="contained"
          onPress={() => setShowCamera(false)}
          style={styles.closeButton}
        >
          Cancelar
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => {
          setScanned(false);
          setShowCamera(true);
        }}
      >
        Escanear QR
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cameraContainer: {
    flex: 1,
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
});
