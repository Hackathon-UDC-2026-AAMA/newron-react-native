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
          title: "My notes",
          tabBarIcon: ({ color }) => <NotepadText size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-newron"
        options={{
          title: "My Newron",
          tabBarIcon: ({ color }) => <BrainCircuit size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings size={28} color={color} />,
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
