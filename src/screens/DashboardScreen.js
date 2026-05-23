import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../constants/theme";
import { BRAND } from "../constants/brand";
import { initialLeads } from "../data/mockData";

export default function DashboardScreen() {
  const totalLeads = initialLeads.length;
  const hotLeads = initialLeads.filter((lead) => lead.status === "Hot Lead").length;
  const convertedLeads = initialLeads.filter(
    (lead) => lead.status === "Converted"
  ).length;
  const followUps = initialLeads.filter(
    (lead) => lead.status === "Contacted" || lead.status === "Hot Lead"
  ).length;

  const conversionRate = Math.round((convertedLeads / totalLeads) * 100);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.greeting}>Welcome back 👋</Text>
      <Text style={styles.title}>{BRAND.name}</Text>
      <Text style={styles.subtitle}>{BRAND.slogan}</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalLeads}</Text>
          <Text style={styles.statLabel}>Total Leads</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{hotLeads}</Text>
          <Text style={styles.statLabel}>Hot Leads</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{convertedLeads}</Text>
          <Text style={styles.statLabel}>Converted</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{conversionRate}%</Text>
          <Text style={styles.statLabel}>Conversion</Text>
        </View>
      </View>

      <View style={styles.insightCard}>
        <Text style={styles.insightLabel}>AI Business Insight</Text>
        <Text style={styles.insightTitle}>Follow up your warm leads today</Text>
        <Text style={styles.insightText}>
          You have {followUps} leads that need attention. Sending a short,
          personal WhatsApp message today can increase your chances of closing
          more clients.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Best Channel</Text>
        <Text style={styles.cardText}>
          WhatsApp is your strongest conversion channel. Focus on short offers,
          testimonials, urgency, and direct calls to action.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Suggested Action</Text>
        <Text style={styles.cardText}>
          Generate a follow-up message for your hot leads and send it before the
          end of the day.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
  },

  greeting: {
    marginTop: 36,
    color: COLORS.muted,
    fontSize: 16,
  },

  title: {
    color: COLORS.dark,
    fontSize: 34,
    fontWeight: "900",
    marginTop: 6,
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 15,
    marginTop: 6,
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