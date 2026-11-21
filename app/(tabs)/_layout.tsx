import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Tambah",
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>➕</Text>,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorite",
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>❤️</Text>,
        }}
      />
    </Tabs>
  );
}
