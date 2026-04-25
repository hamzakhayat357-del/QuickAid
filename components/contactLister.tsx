import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCountry } from "../context/locationcontext";
import {
  ContactKind,
  EmergencyContact,
  getCountryByCode,
} from "../models/contact";

const kindIcons: Record<ContactKind, keyof typeof Ionicons.glyphMap> = {
  coast: "water",
  fire: "flame",
  general: "alert-circle",
  medical: "medkit",
  police: "shield-checkmark",
  road: "car",
  support: "heart",
};

const priorityLabels = {
  critical: "Call first",
  important: "Important",
  useful: "Useful",
};

const testContact: EmergencyContact = {
  id: "test-contact",
  title: "Test Contact",
  number: "555-0100",
  subtitle: "Demo number for checking the call button",
  kind: "support",
  priority: "useful",
};

export default function ContactLister() {
  const { country } = useCountry();
  const selectedCountry = getCountryByCode(country);
  const contacts = useMemo(
    () =>
      [...(selectedCountry?.contacts ?? []), testContact].sort((a, b) => {
        const weight = { critical: 0, important: 1, useful: 2 };
        return weight[a.priority] - weight[b.priority];
      }),
    [selectedCountry],
  );

  if (!selectedCountry) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emergency contacts</Text>
        <Text style={styles.subtitle}>{selectedCountry.note}</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.list}
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ContactCard
            accent={selectedCountry.accent}
            contact={item}
            index={index}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function ContactCard({
  accent,
  contact,
  index,
}: {
  accent: string;
  contact: EmergencyContact;
  index: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(18)).current;
  const iconName = kindIcons[contact.kind];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        delay: 75 * index,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.spring(translate, {
        toValue: 0,
        delay: 75 * index,
        damping: 16,
        stiffness: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translate]);

  const callContact = () => {
    const dialable = contact.number.replace(/[^\d+]/g, "");
    Linking.openURL(`tel:${dialable}`);
  };

  return (
    <Animated.View
      style={[
        styles.contactCard,
        {
          opacity,
          transform: [{ translateY: translate }],
        },
      ]}
    >
      <View style={styles.cardTop}>
        <View style={[styles.serviceIcon, { backgroundColor: `${accent}18` }]}>
          <Ionicons name={iconName} size={25} color={accent} />
        </View>
        <View style={styles.serviceInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.contactTitle}>{contact.title}</Text>
            <View
              style={[
                styles.priorityPill,
                contact.priority === "critical" && styles.criticalPill,
              ]}
            >
              <Text
                style={[
                  styles.priorityText,
                  contact.priority === "critical" && styles.criticalText,
                ]}
              >
                {priorityLabels[contact.priority]}
              </Text>
            </View>
          </View>
          <Text style={styles.contactSubtitle}>{contact.subtitle}</Text>
        </View>
      </View>

      <View style={styles.callRow}>
        <Text style={[styles.number, { color: accent }]}>{contact.number}</Text>
        <Pressable
          accessibilityLabel={`Call ${contact.title}`}
          accessibilityRole="button"
          onPress={callContact}
          style={({ pressed }) => [
            styles.callButton,
            { backgroundColor: accent, opacity: pressed ? 0.82 : 1 },
          ]}
        >
          <Ionicons name="call" size={19} color="#ffffff" />
          <Text style={styles.callText}>Call</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  callButton: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    minHeight: 44,
    paddingHorizontal: 18,
  },
  callRow: {
    alignItems: "center",
    borderTopColor: "#e2e8f0",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    paddingTop: 16,
  },
  callText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
  cardTop: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  contactCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    padding: 16,
    shadowColor: "#0f172a",
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.07,
    shadowRadius: 18,
  },
  contactSubtitle: {
    color: "#64748b",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  contactTitle: {
    color: "#0f172a",
    flex: 1,
    fontSize: 17,
    fontWeight: "900",
  },
  container: {
    backgroundColor: "#f8fafc",
    flex: 1,
  },
  criticalPill: {
    backgroundColor: "#fee2e2",
  },
  criticalText: {
    color: "#b91c1c",
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 8,
  },
  list: {
    padding: 22,
    paddingTop: 18,
  },
  number: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 0,
  },
  priorityPill: {
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  priorityText: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  serviceIcon: {
    alignItems: "center",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    marginRight: 13,
    width: 50,
  },
  serviceInfo: {
    flex: 1,
  },
  subtitle: {
    color: "#64748b",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 9,
  },
  title: {
    color: "#0f172a",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0,
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
});
