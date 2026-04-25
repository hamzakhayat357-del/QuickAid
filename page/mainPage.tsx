import React, { useState } from "react";
import ContactLister from "../components/contactLister";
import LocationSelector from "../components/locationSelector";
import { useCountry } from "../context/locationcontext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function MainPage() {
  const { country } = useCountry();
  const [selectorExpanded, setSelectorExpanded] = useState(true);

  return (
    <SafeAreaView style={{ backgroundColor: "#f8fafc", flex: 1 }}>
      <StatusBar style="dark" />
      <LocationSelector
        expanded={selectorExpanded}
        onExpandedChange={setSelectorExpanded}
      />
      {country && !selectorExpanded ? <ContactLister /> : null}
    </SafeAreaView>
  );
}
