import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function LogoPage() {
  const scale = useRef(new Animated.Value(0.88)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logo,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        <View style={styles.mark}>
          <Ionicons name="medical" size={42} color="#ffffff" />
        </View>
        <Text style={styles.title}>QuickAid</Text>
        <Text style={styles.subtitle}>Emergency numbers, instantly</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#0f172a",
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    alignItems: "center",
  },
  mark: {
    alignItems: "center",
    backgroundColor: "#ef4444",
    borderRadius: 28,
    height: 88,
    justifyContent: "center",
    shadowColor: "#ef4444",
    shadowOffset: { height: 16, width: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 22,
    width: 88,
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 15,
    marginTop: 8,
  },
  title: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 0,
    marginTop: 18,
  },
});
