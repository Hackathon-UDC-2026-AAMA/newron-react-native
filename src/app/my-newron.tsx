import { Cluster, getClusters } from "@/API/clusterService";
import { getItems, groupItemsByCluster, Item } from "@/API/itemService";
import { BackgroundWrapper } from "@/components/layout/background-wrapper";
import { Heading } from "@/components/ui/heading";
import { TopBar } from "@/components/ui/topBar";
import { ClusterList } from "@/screens/categories/components/clusterList";
import { RefreshCcw } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();

  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const { colors } = useTheme();

  const fetchData = async () => {
    const itemsData = await getItems();
    setItems(itemsData);
    const clusterData = await getClusters();
    setClusters(clusterData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BackgroundWrapper>
      <View style={[styles.container, { paddingTop: insets.top + 60 }]}>
        <TopBar />

        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Heading style={(styles.heading, { marginVertical: 8 })}>
            Mi Newron
          </Heading>
          <TouchableOpacity onPress={fetchData}>
            <RefreshCcw color={colors.primary} />
          </TouchableOpacity>
        </View>

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
