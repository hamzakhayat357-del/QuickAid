import { View } from "react-native";
import React from "react";
import ContactLister from "../components/contactLister";
import LocationSelector from "../components/locationSelector";
export default function MainPage() {
  return (
    <View>
      <LocationSelector />
      <ContactLister />
    </View>
  );
}
