import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCountry } from "../context/locationcontext";
import { ContactKind, EmergencyContact, getCountryByCode } from "../models/contact";

const KIND_ICONS: Record<ContactKind, keyof typeof Ionicons.glyphMap> = {
  police: "shield",
  medical: "medkit",
  fire: "flame",
  general: "call",
  support: "heart",
  road: "car",
  coast: "boat",
};

const PRIORITY_LABELS: Record<EmergencyContact["priority"], string> = {
  critical: "Call first",
  important: "Important",
  useful: "Useful",
};

const PRIORITY_ORDER: Record<EmergencyContact["priority"], number> = {
  critical: 0,
  important: 1,
  useful: 2,
};

function priorityColors(priority: EmergencyContact["priority"], accent: string) {
  switch (priority) {
    case "critical":
      return { bg: accent + "18", text: accent };
    case "important":
      return { bg: "#f59e0b18", text: "#d97706" };
    case "useful":
      return { bg: "#64748b18", text: "#64748b" };
  }
}

function ContactCard({
  contact,
  accent,
  index,
}: {
  contact: EmergencyContact;
  accent: string;
  index: number;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    const delay = index * 80;
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, index]);

  const pColors = priorityColors(contact.priority, accent);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.cardTop}>
        <View style={[styles.iconCircle, { backgroundColor: accent + "15" }]}>
          <Ionicons
            name={KIND_ICONS[contact.kind]}
            size={22}
            color={accent}
          />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{contact.title}</Text>
          <Text style={styles.cardSubtitle}>{contact.subtitle}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: pColors.bg }]}>
          <Text style={[styles.badgeText, { color: pColors.text }]}>
            {PRIORITY_LABELS[contact.priority]}
          </Text>
        </View>
      </View>

      <View style={styles.cardBottom}>
        <Text style={styles.phoneNumber}>{contact.number}</Text>
        <Pressable
          style={({ pressed }) => [
            styles.callButton,
            { backgroundColor: accent },
            pressed && { opacity: 0.8 },
          ]}
          onPress={() => Linking.openURL(`tel:${contact.number}`)}
        >
          <Ionicons name="call" size={18} color="#ffffff" />
          <Text style={styles.callText}>Call</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

export default function ContactLister() {
  const { country } = useCountry();
  const data = getCountryByCode(country);

  if (!data) return null;

  const sorted = [...data.contacts].sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {data.note ? (
        <View style={styles.noteBox}>
          <Ionicons name="information-circle" size={18} color="#64748b" />
          <Text style={styles.noteText}>{data.note}</Text>
        </View>
      ) : null}

      {sorted.map((contact, i) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          accent={data.accent}
          index={i}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 32,
  },
  noteBox: {
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  noteText: {
    color: "#475569",
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTop: {
    alignItems: "center",
    flexDirection: "row",
  },
  iconCircle: {
    alignItems: "center",
    borderRadius: 12,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "700",
  },
  cardSubtitle: {
    color: "#64748b",
    fontSize: 13,
    marginTop: 2,
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  cardBottom: {
    alignItems: "center",
    borderTopColor: "#f1f5f9",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    paddingTop: 14,
  },
  phoneNumber: {
    color: "#0f172a",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 1,
  },
  callButton: {
    alignItems: "center",
    borderRadius: 12,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  callText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});
