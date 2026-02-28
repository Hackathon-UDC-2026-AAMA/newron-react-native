import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { PropsWithChildren } from "react";
import { BackgroundWrapper } from "../layout/background-wrapper";

export const ScreenContainer = ({ children }: PropsWithChildren) => {
  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {children}
      </SafeAreaView>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
