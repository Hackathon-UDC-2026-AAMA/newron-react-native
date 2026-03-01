import { Tabs } from "expo-router";
import {
  Settings,
  ChartBar,
  NotepadText,
  BrainCircuit,
} from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

export const TabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarBackground: () => (
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: colors.background },
            ]}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Mis notas",
          tabBarIcon: ({ color }) => <NotepadText size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-newron"
        options={{
          title: "Mi Newron",
          tabBarIcon: ({ color }) => <BrainCircuit size={28} color={color} />,
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
});
