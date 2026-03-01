import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { ClusterModal } from "./clusterModal";
import { Item } from "@/API/itemService";

export interface ClusterItem {
  id: number;
  cluster_label: string | null;
  cluster_description: string | null;
  cluster_keywords: string[];
  size: number;
}

interface ClusterListProps {
  clusters: ClusterItem[];
  items: Item[];
}

export const ClusterList: React.FC<ClusterListProps> = ({
  clusters,
  items,
}) => {
  const { colors } = useTheme();

  const [selectedCluster, setSelectedCluster] = useState<ClusterItem | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]); // 👈 añadido

  const handlePress = (cluster: ClusterItem) => {
    if (!items) return;

    const clusterItems = items.filter((item) => item.cluster_id === cluster.id);

    setFilteredItems(clusterItems);
    setSelectedCluster(cluster);
    setModalVisible(true);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {clusters.map((cluster) => (
          <Pressable
            key={cluster.id}
            onPress={() => handlePress(cluster)}
            style={({ pressed }) => [
              styles.card,
              {
                backgroundColor: "#FFFFFF",
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <Text variant="titleMedium" style={{ color: colors.primary }}>
              {cluster.cluster_label ?? `Cluster ${cluster.id}`}
            </Text>

            {cluster.cluster_description && (
              <Text
                style={[styles.description, { color: colors.onSurfaceVariant }]}
              >
                {cluster.cluster_description}
              </Text>
            )}

            <View style={styles.keywordContainer}>
              {cluster.cluster_keywords.map((keyword, index) => (
                <View
                  key={index}
                  style={[
                    styles.keywordChip,
                    { backgroundColor: colors.secondary },
                  ]}
                >
                  <Text
                    style={[
                      styles.keywordText,
                      { color: colors.surfaceVariant },
                    ]}
                  >
                    {keyword}
                  </Text>
                </View>
              ))}
            </View>

            <Text style={[styles.size, { color: colors.onSurfaceVariant }]}>
              {cluster.size} elementos
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ClusterModal
        visible={modalVisible}
        cluster={selectedCluster}
        items={filteredItems}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
  },
  keywordContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  keywordChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 6,
  },
  keywordText: {
    fontSize: 12,
  },
  size: {
    fontSize: 12,
  },
});
