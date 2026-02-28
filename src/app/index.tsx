import { getClusters } from "@/components/API/clusterService";
import { getItems, groupItemsByCluster } from "@/components/API/itemService";
import { BackgroundWrapper } from "@/components/layout/background-wrapper";
import { Heading } from "@/components/ui/heading";
import { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text } from "react-native-paper";

export default function Index() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!text.trim()) {
      Alert.alert("Error", "El campo no puede estar vacío");
      return;
    }

    try {
      setLoading(true);

      const response = await sendIngest(text);

      console.log("Respuesta backend:", response);


    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      Alert.alert("Error", "No se pudo enviar la petición");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const items = await getItems();
      const clusters = await getClusters();
      const listItem = await groupItemsByCluster(items);

      console.log("Items:", items);
      console.log("Clusters:", clusters);
      console.log("----------------")
      console.log("Lista ordenada: ", listItem)
    } catch (error) {
      console.log("Error general:", error);
    }
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Heading>Heading 1</Heading>
        <Text>Edit src/app/index.tsx to edit this screen.</Text>
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
  input: {
    height: 40,
    width: "100%",
    padding: 10,
    marginVertical: 15,
    borderWidth: 1,
  },
});