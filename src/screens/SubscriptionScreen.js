import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../constants/theme";

export default function SubscriptionScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Upgrade</Text>
      <Text style={styles.subtitle}>
        Unlock unlimited AI sales tools for your business.
      </Text>

      <View style={styles.plan}>
        <Text style={styles.planName}>Free</Text>
        <Text style={styles.price}>0 FCFA</Text>
        <Text style={styles.feature}>5 AI generations per day</Text>
      </View>

      <View style={styles.planPro}>
        <Text style={styles.planNamePro}>Pro</Text>
        <Text style={styles.pricePro}>5,000 FCFA / month</Text>
        <Text style={styles.featurePro}>Unlimited AI generations</Text>
        <Text style={styles.featurePro}>Lead tracking</Text>
        <Text style={styles.featurePro}>WhatsApp templates</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pay with Mobile Money</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.orangeButton}>
          <Text style={styles.buttonText}>Pay with Orange Money</Text>
        </TouchableOpacity>
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
  plan: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: SIZES.radius,
    marginBottom: 16,
    ...SHADOWS.card,
  },
  planPro: {
    backgroundColor: COLORS.dark,
    padding: 22,
    borderRadius: SIZES.radius,
    marginBottom: 16,
  },
  planName: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.dark,
  },
  planNamePro: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  price: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.primary,
    marginVertical: 12,
  },
  pricePro: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.secondary,
    marginVertical: 12,
  },
  feature: {
    color: COLORS.muted,
    marginBottom: 6,
  },
  featurePro: {
    color: "#CBD5E1",
    marginBottom: 8,
  },
  button: {
    backgroundColor: COLORS.success,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 18,
  },
  orangeButton: {
    backgroundColor: COLORS.secondary,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
});