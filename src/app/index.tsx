import { BackgroundWrapper } from "@/components/layout/background-wrapper";
import { Heading } from "@/components/ui/heading";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function Index() {
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
  },
});
