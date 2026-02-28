import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useBackendConnection = () => {
  const [connected, setConnected] = useState(false);
  const [checking, setChecking] = useState(true);

  const checkConnection = async () => {
    try {
      const ip = await AsyncStorage.getItem("server_ip");

      if (!ip) {
        setConnected(false);
        return;
      }

      const res = await fetch(`http://${ip}:8000/health`, {
        timeout: 3000,
      });

      setConnected(res.ok);
    } catch {
      setConnected(false);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();

    const interval = setInterval(checkConnection, 5000);

    return () => clearInterval(interval);
  }, []);

  return { connected, checking };
};