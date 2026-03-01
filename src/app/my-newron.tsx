import { Cluster } from "@/API/clusterService";
import { getItems, Item } from "@/API/itemService";
import { BackgroundWrapper } from "@/components/layout/background-wrapper";
import { Heading } from "@/components/ui/heading";
import { TopBar } from "@/components/ui/topBar";
import { ClusterList } from "@/screens/categories/components/clusterList";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();

  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const itemsData = await getItems();
      setItems(itemsData);
    };

    fetchData();
  }, []);

  return (
    <BackgroundWrapper>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top + 60 },
        ]}
      >
        <TopBar />

        <Heading style={styles.heading}>
          Analytics
        </Heading>

        <ClusterList clusters={clusters} items={items} />
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  heading: {
    marginBottom: 16,
  },
});