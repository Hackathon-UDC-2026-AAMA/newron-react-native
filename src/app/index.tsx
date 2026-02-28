import { getClusters } from "@/API/clusterService";
import { getItems, groupItemsByCluster } from "@/API/itemService";
import { sendIngest } from "@/API/ingestService";
import { BackgroundWrapper } from "@/components/layout/background-wrapper";
import { Heading } from "@/components/ui/heading";
import { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { NoteBar } from "@/components/ui/noteBar";
import { Brain } from "lucide-react-native";
import React from "react";
import { CategoryList } from "@/components/categoryList/categoryList";

export default function Index() {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const categories = [
  { id: "1", content: "Trabajo" },
  { id: "2", content: "Personal" },
  { id: "3", content: "Ideas" },
  { id: "4", content: "Perros" },
  { id: "5", content: "Cocina" },

];


  const fetchData = async () => {
    try {
      const items = await getItems();
      const clusters = await getClusters();

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
        <CategoryList categories={categories} />
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
