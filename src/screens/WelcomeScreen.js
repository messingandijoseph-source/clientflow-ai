import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight, Sparkles } from "lucide-react-native";

import { BRAND } from "../constants/brand";
import { COLORS, SIZES, SHADOWS } from "../constants/theme";

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient colors={["#2563EB", "#0F172A"]} style={styles.container}>
      <View style={styles.logoBox}>
        <Sparkles color="#FFFFFF" size={34} />
      </View>

      <Text style={styles.title}>{BRAND.name}</Text>

      <Text style={styles.slogan}>{BRAND.slogan}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Win more clients with AI</Text>

        <Text style={styles.cardText}>
          Generate WhatsApp sales messages, follow-ups, promo offers and social
          media captions for your business in seconds.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("MainTabs")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <ArrowRight color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Built for African business owners</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
    justifyContent: "center",
  },

  logoBox: {
    width: 82,
    height: 82,
    borderRadius: 28,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 26,
    ...SHADOWS.card,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "900",
    marginBottom: 10,
  },

  slogan: {
    color: "#CBD5E1",
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 36,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 24,
    ...SHADOWS.card,
  },

  cardTitle: {
    color: COLORS.dark,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 10,
  },

  cardText: {
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 24,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },

  footer: {
    color: "#CBD5E1",
    textAlign: "center",
    marginTop: 28,
    fontWeight: "700",
  },
});