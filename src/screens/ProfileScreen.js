import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { LogOut, User, Languages, Crown } from "lucide-react-native";

import { COLORS, SIZES, SHADOWS } from "../constants/theme";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();

  const handleLogout = () => {
    Alert.alert(
      language === "en" ? "Logout" : "Déconnexion",
      language === "en"
        ? "Are you sure you want to logout?"
        : "Voulez-vous vraiment vous déconnecter ?",
      [
        {
          text: language === "en" ? "Cancel" : "Annuler",
          style: "cancel",
        },
        {
          text: language === "en" ? "Logout" : "Déconnexion",
          style: "destructive",
          onPress: signOut,
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>
        {language === "en" ? "Profile" : "Profil"}
      </Text>

      <Text style={styles.subtitle}>
        {language === "en"
          ? "Manage your account and preferences."
          : "Gère ton compte et tes préférences."}
      </Text>

      <View style={styles.card}>
        <View style={styles.iconBox}>
          <User color="#FFFFFF" size={28} />
        </View>

        <Text style={styles.cardTitle}>
          {language === "en" ? "Account" : "Compte"}
        </Text>

        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.smallIconBox}>
            <Crown color="#FFFFFF" size={20} />
          </View>

          <View>
            <Text style={styles.label}>
              {language === "en" ? "Current Plan" : "Plan actuel"}
            </Text>
            <Text style={styles.value}>
              {language === "en" ? "Free Plan" : "Plan gratuit"}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.optionCard} onPress={toggleLanguage}>
        <View style={styles.row}>
          <View style={styles.smallIconBox}>
            <Languages color="#FFFFFF" size={20} />
          </View>

          <View>
            <Text style={styles.label}>
              {language === "en" ? "Language" : "Langue"}
            </Text>
            <Text style={styles.value}>
              {language === "en" ? "English" : "Français"}
            </Text>
          </View>
        </View>

        <Text style={styles.changeText}>
          {language === "en" ? "Switch to French" : "Passer en anglais"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut color="#FFFFFF" size={20} />
        <Text style={styles.logoutText}>
          {language === "en" ? "Logout" : "Déconnexion"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
  },

  title: {
    marginTop: 36,
    fontSize: 34,
    fontWeight: "900",
    color: COLORS.dark,
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 15,
    marginTop: 8,
    marginBottom: 24,
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 22,
    borderRadius: SIZES.radius,
    marginBottom: 16,
    ...SHADOWS.card,
  },

  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  smallIconBox: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.dark,
    marginBottom: 6,
  },

  email: {
    color: COLORS.muted,
    fontSize: 15,
  },

  optionCard: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: SIZES.radius,
    marginBottom: 16,
    ...SHADOWS.card,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "700",
  },

  value: {
    color: COLORS.dark,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 4,
  },

  changeText: {
    color: COLORS.primary,
    fontWeight: "900",
    marginTop: 16,
  },

  logoutButton: {
    backgroundColor: COLORS.danger,
    padding: 17,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
    marginBottom: 40,
  },

  logoutText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },
});