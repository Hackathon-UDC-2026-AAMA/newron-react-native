import React from "react";
import { View, StyleSheet, Modal, FlatList, Linking } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { Item } from "@/API/itemService";

export interface ClusterItem {
  id: number;
  cluster_label: string | null;
  cluster_description: string | null;
  cluster_keywords: string[];
  size: number;
}

interface ClusterModalProps {
  visible: boolean;
  cluster: ClusterItem | null;
  items: Item[];
  onClose: () => void;
}

export const ClusterModal: React.FC<ClusterModalProps> = ({
  visible,
  cluster,
  items,
  onClose,
}) => {
  const { colors } = useTheme();

  if (!cluster) return null;

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <Text
            key={index}
            style={{
              color: colors.primary,
              textDecorationLine: "underline",
            }}
            onPress={() => Linking.openURL(part)}
          >
            {part}
          </Text>
        );
      }

      return (
        <Text key={index} style={{ color: colors.surfaceVariant }}>
          {part}
        </Text>
      );
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text variant="titleLarge" style={{ color: colors.inversePrimary }}>
            {cluster.cluster_label}
          </Text>

          {cluster.cluster_description && (
            <Text
              style={[styles.description, { color: colors.surfaceVariant }]}
            >
              {cluster.cluster_description}
            </Text>
          )}

          <View style={styles.keywordContainer}>
            {cluster.cluster_keywords.map((keyword, index) => (
              <View key={index} style={styles.keywordChip}>
                <Text
                  style={[styles.keywordText, { color: colors.inversePrimary }]}
                >
                  {keyword}
                </Text>
              </View>
            ))}
          </View>

          <Text style={[styles.size, { color: colors.surfaceVariant }]}>
            {items.length} elementos
          </Text>

          {/* 🔥 LISTADO DE ITEMS */}
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.itemCard,
                  { backgroundColor: colors.inversePrimary },
                ]}
              >
                <Text>{renderTextWithLinks(item.original_input)}</Text>
              </View>
            )}
          />

          <Button mode="contained" style={{ marginTop: 16 }} onPress={onClose}>
            Cerrar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
  },
  description: {
    marginTop: 12,
  },
  keywordContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
    marginTop: 5,
  },
  size: {
    marginTop: 16,
    fontSize: 12,
  },
  keywordChip: {
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 6,
  },
  keywordText: {
    fontSize: 12,
  },
  list: {
    marginTop: 12,
  },
  itemCard: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
});
