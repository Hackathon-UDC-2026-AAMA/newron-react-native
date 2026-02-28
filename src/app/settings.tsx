import { BackgroundWrapper } from "@/components/layout/background-wrapper";
import { Heading } from "@/components/ui/heading";
import { View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Heading>Settings</Heading>
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
