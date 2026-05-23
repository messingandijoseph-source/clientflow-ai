import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight, Sparkles } from "lucide-react-native";

import { COLORS, SIZES, SHADOWS } from "../constants/theme";
import { useLanguage } from "../contexts/LanguageContext";

export default function WelcomeScreen({ navigation }) {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <LinearGradient colors={["#2563EB", "#0F172A"]} style={styles.container}>
      <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
        <Text style={styles.langText}>{language === "en" ? "FR" : "EN"}</Text>
      </TouchableOpacity>

      <View style={styles.logoBox}>
        <Sparkles color="#FFFFFF" size={34} />
      </View>

      <Text style={styles.title}>{t.appName}</Text>

      <Text style={styles.slogan}>{t.slogan}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t.welcomeTitle}</Text>

        <Text style={styles.cardText}>{t.welcomeText}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.buttonText}>{t.getStarted}</Text>
          <ArrowRight color="#FFFFFF" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>{t.login}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>{t.builtFor}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
    justifyContent: "center",
  },

  langButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.16)",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 14,
  },

  langText: {
    color: "#FFFFFF",
    fontWeight: "900",
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

  loginButton: {
    marginTop: 16,
    alignItems: "center",
  },

  loginText: {
    color: COLORS.primary,
    fontWeight: "900",
    fontSize: 15,
  },

  footer: {
    color: "#CBD5E1",
    textAlign: "center",
    marginTop: 28,
    fontWeight: "700",
  },
});