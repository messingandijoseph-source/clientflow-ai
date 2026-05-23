import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { COLORS, SIZES, SHADOWS } from "../constants/theme";
import { BRAND } from "../constants/brand";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { getLeads, getUserProfile } from "../services/database";

export default function DashboardScreen() {
  const { language, toggleLanguage, t } = useLanguage();
  const { user } = useAuth();

  const [leads, setLeads] = useState([]);
  const [profileName, setProfileName] = useState("");
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    if (!user) return;

    setLoading(true);

    const { data: profile } = await getUserProfile(user.id);

    if (profile?.full_name) {
      setProfileName(profile.full_name);
    }

    const { data: leadsData, error } = await getLeads(user.id);

    if (!error) {
      setLeads(leadsData || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const totalLeads = leads.length;

  const newLeads = leads.filter((lead) => lead.status === "New").length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const negotiatingLeads = leads.filter(
    (lead) => lead.status === "Negotiating"
  ).length;

  const convertedLeads = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  const lostLeads = leads.filter((lead) => lead.status === "Lost").length;

  const activeOpportunities = newLeads + contactedLeads + negotiatingLeads;

  const conversionRate =
    totalLeads === 0 ? 0 : Math.round((convertedLeads / totalLeads) * 100);

  const firstName = profileName ? profileName.split(" ")[0] : "";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View style={styles.headerTextBox}>
          <Text style={styles.greeting}>
            {firstName
              ? language === "en"
                ? `Welcome back, ${firstName} 👋`
                : `Bon retour, ${firstName} 👋`
              : t.welcomeBack}
          </Text>

          <Text style={styles.title}>{BRAND.name}</Text>
        </View>

        <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
          <Text style={styles.langText}>{language === "en" ? "FR" : "EN"}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>{t.slogan}</Text>

      {loading ? (
        <ActivityIndicator color={COLORS.primary} size="large" />
      ) : (
        <>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{totalLeads}</Text>
              <Text style={styles.statLabel}>
                {language === "en" ? "Total Leads" : "Total prospects"}
              </Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{activeOpportunities}</Text>
              <Text style={styles.statLabel}>
                {language === "en" ? "Active Deals" : "Opportunités"}
              </Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{convertedLeads}</Text>
              <Text style={styles.statLabel}>{t.converted}</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{conversionRate}%</Text>
              <Text style={styles.statLabel}>{t.conversion}</Text>
            </View>
          </View>

          <View style={styles.pipelineCard}>
            <Text style={styles.pipelineTitle}>
              {language === "en" ? "Sales Pipeline" : "Pipeline de vente"}
            </Text>

            <View style={styles.pipelineRow}>
              <Text style={styles.pipelineLabel}>
                {language === "en" ? "New" : "Nouveau"}
              </Text>
              <Text style={styles.pipelineValue}>{newLeads}</Text>
            </View>

            <View style={styles.pipelineRow}>
              <Text style={styles.pipelineLabel}>
                {language === "en" ? "Contacted" : "Contacté"}
              </Text>
              <Text style={styles.pipelineValue}>{contactedLeads}</Text>
            </View>

            <View style={styles.pipelineRow}>
              <Text style={styles.pipelineLabel}>
                {language === "en" ? "Negotiating" : "Négociation"}
              </Text>
              <Text style={styles.pipelineValue}>{negotiatingLeads}</Text>
            </View>

            <View style={styles.pipelineRow}>
              <Text style={styles.pipelineLabel}>
                {language === "en" ? "Converted" : "Converti"}
              </Text>
              <Text style={styles.pipelineValue}>{convertedLeads}</Text>
            </View>

            <View style={styles.pipelineRow}>
              <Text style={styles.pipelineLabel}>
                {language === "en" ? "Lost" : "Perdu"}
              </Text>
              <Text style={styles.pipelineValue}>{lostLeads}</Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <Text style={styles.insightLabel}>{t.aiInsight}</Text>
            <Text style={styles.insightTitle}>
              {language === "en"
                ? "Focus on active opportunities"
                : "Concentre-toi sur les opportunités actives"}
            </Text>
            <Text style={styles.insightText}>
              {language === "en"
                ? `You currently have ${activeOpportunities} active opportunities. Follow up with contacted and negotiating leads to improve your conversion rate.`
                : `Tu as actuellement ${activeOpportunities} opportunités actives. Relance les prospects contactés et en négociation pour améliorer ton taux de conversion.`}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{t.bestChannel}</Text>
            <Text style={styles.cardText}>{t.bestChannelText}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{t.suggestedAction}</Text>
            <Text style={styles.cardText}>{t.suggestedActionText}</Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
  },

  headerRow: {
    marginTop: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTextBox: {
    flex: 1,
    paddingRight: 10,
  },

  greeting: {
    color: COLORS.muted,
    fontSize: 16,
  },

  title: {
    color: COLORS.dark,
    fontSize: 34,
    fontWeight: "900",
    marginTop: 6,
  },

  langButton: {
    backgroundColor: COLORS.dark,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },

  langText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 15,
    marginTop: 10,
    marginBottom: 24,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 24,
  },

  statCard: {
    width: "47%",
    backgroundColor: COLORS.card,
    padding: 18,
    borderRadius: SIZES.radius,
    ...SHADOWS.card,
  },

  statNumber: {
    fontSize: 30,
    fontWeight: "900",
    color: COLORS.primary,
  },

  statLabel: {
    color: COLORS.muted,
    marginTop: 4,
    fontWeight: "700",
  },

  pipelineCard: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: SIZES.radius,
    marginBottom: 18,
    ...SHADOWS.card,
  },

  pipelineTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.dark,
    marginBottom: 14,
  },

  pipelineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  pipelineLabel: {
    color: COLORS.muted,
    fontWeight: "800",
  },

  pipelineValue: {
    color: COLORS.dark,
    fontWeight: "900",
  },

  insightCard: {
    backgroundColor: COLORS.dark,
    padding: 22,
    borderRadius: SIZES.radius,
    marginBottom: 18,
  },

  insightLabel: {
    color: COLORS.secondary,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 8,
    textTransform: "uppercase",
  },

  insightTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "900",
    marginBottom: 10,
  },

  insightText: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 23,
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: SIZES.radius,
    marginBottom: 18,
    ...SHADOWS.card,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.dark,
    marginBottom: 8,
  },

  cardText: {
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 23,
  },
});