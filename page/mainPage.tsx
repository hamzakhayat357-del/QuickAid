import { View } from "react-native";
import React from "react";
import ContactLister from "../components/contactLister";
import LocationSelector from "../components/locationSelector";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainPage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <LocationSelector />
        <ContactLister />
      </View>
    </SafeAreaView>
  );
}