export type ContactKind =
  | "general"
  | "police"
  | "medical"
  | "fire"
  | "support"
  | "road"
  | "coast";

export type EmergencyContact = {
  id: string;
  title: string;
  number: string;
  subtitle: string;
  kind: ContactKind;
  priority: "critical" | "important" | "useful";
};

export type EmergencyCountry = {
  code: string;
  name: string;
  flag: string;
  region: string;
  accent: string;
  note: string;
  contacts: EmergencyContact[];
};

export const emergencyCountries: EmergencyCountry[] = [
  {
    code: "MA",
    name: "Morocco",
    flag: "🇲🇦",
    region: "North Africa",
    accent: "#047857",
    note: "For city police use 19. For rural areas and highways, Royal Gendarmerie is 177.",
    contacts: [
      {
        id: "ma-police",
        title: "Police",
        number: "19",
        subtitle: "Urban police emergencies",
        kind: "police",
        priority: "critical",
      },
      {
        id: "ma-medical",
        title: "Ambulance / SAMU",
        number: "15",
        subtitle: "Urgent medical help",
        kind: "medical",
        priority: "critical",
      },
      {
        id: "ma-fire",
        title: "Civil Protection / Fire",
        number: "150",
        subtitle: "Fire, rescue, and accidents",
        kind: "fire",
        priority: "critical",
      },
      {
        id: "ma-gendarmerie",
        title: "Royal Gendarmerie",
        number: "177",
        subtitle: "Rural areas and highways",
        kind: "police",
        priority: "important",
      },
    ],
  },
  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    region: "Europe",
    accent: "#2563eb",
    note: "112 also works across the European Union and routes you to the right service.",
    contacts: [
      {
        id: "fr-general",
        title: "European Emergency",
        number: "112",
        subtitle: "Police, ambulance, or fire",
        kind: "general",
        priority: "critical",
      },
      {
        id: "fr-medical",
        title: "SAMU",
        number: "15",
        subtitle: "Medical emergencies",
        kind: "medical",
        priority: "critical",
      },
      {
        id: "fr-police",
        title: "Police / Gendarmerie",
        number: "17",
        subtitle: "Crime, danger, public order",
        kind: "police",
        priority: "critical",
      },
      {
        id: "fr-fire",
        title: "Firefighters",
        number: "18",
        subtitle: "Fire, rescue, accidents",
        kind: "fire",
        priority: "critical",
      },
      {
        id: "fr-accessibility",
        title: "SMS Emergency",
        number: "114",
        subtitle: "Deaf and hard of hearing",
        kind: "support",
        priority: "useful",
      },
    ],
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    region: "North America",
    accent: "#dc2626",
    note: "911 connects police, fire, and ambulance dispatchers for immediate emergencies.",
    contacts: [
      {
        id: "us-911",
        title: "Emergency Services",
        number: "911",
        subtitle: "Police, fire, or ambulance",
        kind: "general",
        priority: "critical",
      },
      {
        id: "us-988",
        title: "Suicide & Crisis Lifeline",
        number: "988",
        subtitle: "Mental health crisis support",
        kind: "support",
        priority: "important",
      },
    ],
  },
  {
    code: "ES",
    name: "Spain",
    flag: "🇪🇸",
    region: "Europe",
    accent: "#eab308",
    note: "112 is the main all-emergency number. Spain also keeps national service numbers.",
    contacts: [
      {
        id: "es-general",
        title: "Emergency Services",
        number: "112",
        subtitle: "All emergencies",
        kind: "general",
        priority: "critical",
      },
      {
        id: "es-medical",
        title: "Health Emergencies",
        number: "061",
        subtitle: "Ambulance and urgent medical help",
        kind: "medical",
        priority: "critical",
      },
      {
        id: "es-police",
        title: "National Police",
        number: "091",
        subtitle: "Police emergencies",
        kind: "police",
        priority: "important",
      },
      {
        id: "es-local-police",
        title: "Local Police",
        number: "092",
        subtitle: "Local police support",
        kind: "police",
        priority: "useful",
      },
      {
        id: "es-fire",
        title: "Firefighters",
        number: "080",
        subtitle: "Fire and rescue",
        kind: "fire",
        priority: "critical",
      },
    ],
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    accent: "#7c3aed",
    note: "999 and 112 connect to the same emergency response service in the UK.",
    contacts: [
      {
        id: "gb-999",
        title: "Emergency Services",
        number: "999",
        subtitle: "Police, fire, ambulance, coastguard",
        kind: "general",
        priority: "critical",
      },
      {
        id: "gb-112",
        title: "European Emergency",
        number: "112",
        subtitle: "Alternative emergency number",
        kind: "general",
        priority: "critical",
      },
      {
        id: "gb-nhs",
        title: "NHS 111",
        number: "111",
        subtitle: "Urgent medical advice, not life-threatening",
        kind: "medical",
        priority: "important",
      },
      {
        id: "gb-police",
        title: "Police Non-Emergency",
        number: "101",
        subtitle: "Police help when it is not urgent",
        kind: "police",
        priority: "useful",
      },
    ],
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    region: "North America",
    accent: "#ef4444",
    note: "911 is the main emergency number in most Canadian provinces and territories.",
    contacts: [
      {
        id: "ca-911",
        title: "Emergency Services",
        number: "911",
        subtitle: "Police, fire, or ambulance",
        kind: "general",
        priority: "critical",
      },
      {
        id: "ca-988",
        title: "Suicide Crisis Helpline",
        number: "988",
        subtitle: "Mental health crisis support",
        kind: "support",
        priority: "important",
      },
      {
        id: "ca-poison",
        title: "Poison Control",
        number: "1-844-764-7669",
        subtitle: "National poison information",
        kind: "medical",
        priority: "useful",
      },
    ],
  },
];

export const getCountryByCode = (code: string | null) =>
  emergencyCountries.find((country) => country.code === code);
