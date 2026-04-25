import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView, 
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCountry } from "../context/locationcontext";
import {
  emergencyCountries,
  getCountryByCode,
} from "../models/contact";

type Props = {
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
};

export default function LocationSelector({ expanded, onExpandedChange }: Props) {
  const { country, setCountry } = useCountry();
  const selected = getCountryByCode(country);

  const heightAnim = useRef(new Animated.Value(expanded ? 1 : 0)).current;
  const chevronAnim = useRef(new Animated.Value(expanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: expanded ? 1 : 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(chevronAnim, {
        toValue: expanded ? 1 : 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();
  }, [expanded, heightAnim, chevronAnim]);

  const chevronRotation = chevronAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  // Full-screen picker when no country selected
  if (!selected) {
    return (
      <View style={styles.fullScreen}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons name="medical" size={28} color="#fff" />
          </View>
          <Text style={styles.headerTitle}>QuickAid</Text>
          <Text style={styles.headerSubtitle}>
            Select your country to see local emergency numbers
          </Text>
        </View>
        <ScrollView
          style={styles.fullList}
          contentContainerStyle={styles.fullListContent}
          showsVerticalScrollIndicator={false}
        >
          {emergencyCountries.map((c) => (
            <Pressable
              key={c.code}
              style={({ pressed }) => [
                styles.countryRow,
                pressed && styles.countryRowPressed,
              ]}
              onPress={() => {
                setCountry(c.code);
                onExpandedChange(false);
              }}
            >
              <Text style={styles.countryFlag}>{c.flag}</Text>
              <View style={styles.countryInfo}>
                <Text style={styles.countryName}>{c.name}</Text>
                <Text style={styles.countryRegion}>{c.region}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  }

  // Collapsed bar + expandable list
  const listMaxHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 400],
  });

  const listOpacity = heightAnim.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <View style={styles.selectorContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.collapsedBar,
          pressed && { opacity: 0.85 },
        ]}
        onPress={() => onExpandedChange(!expanded)}
      >
        <Text style={styles.barFlag}>{selected.flag}</Text>
        <Text style={styles.barName}>{selected.name}</Text>
        <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
          <Ionicons name="chevron-down" size={20} color="#64748b" />
        </Animated.View>
      </Pressable>

      <Animated.View
        style={[
          styles.dropdownWrapper,
          { maxHeight: listMaxHeight, opacity: listOpacity },
        ]}
      >
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
        >
          {emergencyCountries.map((c) => (
            <Pressable
              key={c.code}
              style={({ pressed }) => [
                styles.dropdownRow,
                c.code === country && styles.dropdownRowActive,
                pressed && styles.countryRowPressed,
              ]}
              onPress={() => {
                setCountry(c.code);
                onExpandedChange(false);
              }}
            >
              <Text style={styles.countryFlag}>{c.flag}</Text>
              <View style={styles.countryInfo}>
                <Text style={styles.countryName}>{c.name}</Text>
                <Text style={styles.countryRegion}>{c.region}</Text>
              </View>
              {c.code === country && (
                <Ionicons name="checkmark-circle" size={20} color={c.accent} />
              )}
            </Pressable>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  headerIcon: {
    alignItems: "center",
    backgroundColor: "#ef4444",
    borderRadius: 20,
    height: 56,
    justifyContent: "center",
    width: 56,
    marginBottom: 14,
  },
  headerTitle: {
    color: "#0f172a",
    fontSize: 26,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#64748b",
    fontSize: 15,
    marginTop: 6,
    textAlign: "center",
  },
  fullList: {
    flex: 1,
  },
  fullListContent: {
    paddingBottom: 32,
  },
  countryRow: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  countryRowPressed: {
    opacity: 0.7,
  },
  countryFlag: {
    fontSize: 28,
    marginRight: 14,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "600",
  },
  countryRegion: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 2,
  },
  selectorContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  collapsedBar: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  barFlag: {
    fontSize: 26,
    marginRight: 12,
  },
  barName: {
    color: "#0f172a",
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
  },
  dropdownWrapper: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    marginTop: 6,
    overflow: "hidden",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  dropdownRow: {
    alignItems: "center",
    borderBottomColor: "#f1f5f9",
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  dropdownRowActive: {
    backgroundColor: "#f8fafc",
  },
});
