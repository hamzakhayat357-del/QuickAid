import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  FlatList,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { useCountry } from "../context/locationcontext";
import {
  EmergencyCountry,
  emergencyCountries,
  getCountryByCode,
} from "../models/contact";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type LocationSelectorProps = {
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
};

export default function LocationSelector({
  expanded,
  onExpandedChange,
}: LocationSelectorProps) {
  const { country, setCountry } = useCountry();
  const selectedCountry = getCountryByCode(country);
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslate = useRef(new Animated.Value(16)).current;
  const sortedCountries = [...emergencyCountries].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 360,
        useNativeDriver: true,
      }),
      Animated.spring(headerTranslate, {
        toValue: 0,
        damping: 16,
        stiffness: 110,
        useNativeDriver: true,
      }),
    ]).start();
  }, [headerOpacity, headerTranslate]);

  useEffect(() => {
    if (!country) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      onExpandedChange(true);
    }
  }, [country, onExpandedChange]);

  const chooseCountry = (code: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCountry(code);
    onExpandedChange(false);
  };

  const expandSelector = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onExpandedChange(true);
  };

  const collapseSelector = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onExpandedChange(false);
  };

  const renderCountry = ({
    item,
    index,
  }: {
    item: EmergencyCountry;
    index: number;
  }) => (
    <CountryCard
      country={item}
      index={index}
      onPress={chooseCountry}
    />
  );

  return (
    <View
      style={[
        styles.container,
        expanded ? styles.expandedContainer : styles.collapsedContainer,
      ]}
    >
      {selectedCountry && !expanded ? (
        <Pressable onPress={expandSelector} style={styles.collapsedBar}>
          <View
            style={[
              styles.collapsedBadge,
              { backgroundColor: selectedCountry.accent },
            ]}
          >
            <Text style={styles.collapsedCode}>{selectedCountry.flag}</Text>
          </View>
          <View style={styles.collapsedTextWrap}>
            <Text style={styles.collapsedLabel}>Current country</Text>
            <Text style={styles.collapsedTitle}>{selectedCountry.name}</Text>
          </View>
          <Ionicons name="chevron-down" size={22} color="#64748b" />
        </Pressable>
      ) : (
        <>
          <Animated.View
            style={[
              styles.header,
              {
                opacity: headerOpacity,
                transform: [{ translateY: headerTranslate }],
              },
            ]}
          >
            <View style={styles.headerTopRow}>
              <View style={styles.iconShell}>
                <Ionicons name="location" size={26} color="#ef4444" />
              </View>
              {selectedCountry ? (
                <Pressable
                  accessibilityRole="button"
                  onPress={collapseSelector}
                  style={styles.collapseButton}
                >
                  <Ionicons name="chevron-up" size={18} color="#0f172a" />
                </Pressable>
              ) : null}
            </View>
            <Text style={styles.eyebrow}>Manual location</Text>
            <Text style={styles.title}>Choose your country</Text>
            <Text style={styles.subtitle}>
              QuickAid will put the most important emergency numbers first.
            </Text>
          </Animated.View>

          <View style={styles.listWrap}>
            <FlatList
              contentContainerStyle={styles.list}
              data={sortedCountries}
              keyExtractor={(item) => item.code}
              renderItem={renderCountry}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      )}
    </View>
  );
}

function CountryCard({
  country,
  index,
  onPress,
}: {
  country: EmergencyCountry;
  index: number;
  onPress: (code: string) => void;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        delay: 70 * index,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.spring(translate, {
        toValue: 0,
        delay: 70 * index,
        damping: 18,
        stiffness: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translate]);

  return (
    <AnimatedPressable
      onPress={() => onPress(country.code)}
      style={({ pressed }) => [
        styles.card,
        {
          borderLeftColor: country.accent,
          opacity,
          transform: [{ translateY: translate }, { scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View style={styles.countryBadge}>
        <Text style={styles.countryCode}>{country.flag}</Text>
      </View>
      <View style={styles.countryInfo}>
        <Text style={styles.countryName}>{country.name}</Text>
      </View>
      <Ionicons name="chevron-forward" size={21} color="#94a3b8" />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 12,
    minHeight: 62,
    paddingHorizontal: 12,
    shadowColor: "#0f172a",
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
  },
  collapseButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderRadius: 8,
    borderWidth: 1,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  collapsedBadge: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderRadius: 8,
    borderWidth: 1,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  collapsedBar: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    marginHorizontal: 18,
    marginTop: 12,
    minHeight: 62,
    paddingHorizontal: 12,
    shadowColor: "#0f172a",
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  collapsedCode: {
    fontSize: 26,
  },
  collapsedLabel: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  collapsedTextWrap: {
    flex: 1,
    marginLeft: 12,
  },
  collapsedTitle: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 2,
  },
  container: {
    backgroundColor: "#f8fafc",
    flexShrink: 0,
    overflow: "hidden",
  },
  collapsedContainer: {
    paddingBottom: 12,
  },
  countryBadge: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderRadius: 8,
    borderWidth: 1,
    height: 46,
    justifyContent: "center",
    marginRight: 12,
    width: 46,
  },
  countryCode: {
    fontSize: 26,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    color: "#0f172a",
    fontSize: 17,
    fontWeight: "800",
  },
  eyebrow: {
    color: "#ef4444",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0,
    marginTop: 16,
    textTransform: "uppercase",
  },
  expandedContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 26,
  },
  headerTopRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconShell: {
    alignItems: "center",
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  list: {
    paddingHorizontal: 22,
    paddingVertical: 18,
    paddingTop: 18,
  },
  listWrap: {
    flex: 1,
  },
  subtitle: {
    color: "#64748b",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    maxWidth: 330,
  },
  title: {
    color: "#0f172a",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0,
    marginTop: 8,
  },
});