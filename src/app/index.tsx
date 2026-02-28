import { getClusters } from "@/API/clusterService";
import { getItems, groupItemsByCluster } from "@/API/itemService";
import { sendIngest } from "@/API/ingestService";
import { BackgroundWrapper } from "@/components/layout/background-wrapper";
import { Heading } from "@/components/ui/heading";
import { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { NoteBar } from "@/components/ui/noteBar";
import { Brain } from "lucide-react-native";

export default function Index() {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const items = await getItems();
      const clusters = await getClusters();

      // ❌ No necesita await porque no es async
      const listItem = groupItemsByCluster(items);

      console.log("Items:", items);
      console.log("Clusters:", clusters);
      console.log("----------------");
      console.log("Lista ordenada: ", listItem);
    } catch (error) {
      console.log("Error general:", error);
    }
  };

  const handleSend = async () => {
    if (!text.trim()) {
      Alert.alert("Error", "El campo no puede estar vacío");
      return;
    }

    try {
      setLoading(true);

      const response = await sendIngest(text);
      console.log("Respuesta backend:", response);
    } catch (error: any) {
      console.log("Error:", error?.response?.data || error?.message);
      Alert.alert("Error", "No se pudo enviar la petición");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Brain size={100} color="#FFF"/>
        <Heading>Newron</Heading>
        <NoteBar />
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
