import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

export const BackgroundWrapper = ({ children }: PropsWithChildren) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
