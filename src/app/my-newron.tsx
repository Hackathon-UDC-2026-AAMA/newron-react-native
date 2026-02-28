import { BackgroundWrapper } from "@/components/layout/background-wrapper";
import { Heading } from "@/components/ui/heading";
import { TopBar } from "@/components/ui/topBar";
import { AppStore } from "@/config/storage/storage";
import { CategoryCard } from "@/screens/categories/components/categoryCard";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";

export default function Index() {
  useEffect(() => {
    const loadMessages = async () => {
      let messages = await AppStore.messages.getItem();
      console.log("======> Messages", messages);
      await AppStore.messages.setItem(["m1", "m2", "m3"]);
      messages = await AppStore.messages.getItem();
      console.log("======> Messages 2", messages);
      await AppStore.messages.deleteAll();
      messages = await AppStore.messages.getItem();
      console.log("======> Messages 3", messages);
    };
    loadMessages();
  }, []);

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <TopBar />
        <Heading>Analytics</Heading>
        <CategoryCard 
          title="Mi Nota"
          description="Esta es una descripción de ejemplo para la tarjeta."
          />
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
