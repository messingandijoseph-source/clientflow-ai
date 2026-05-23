import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";

import { CheckCircle, Crown, Smartphone } from "lucide-react-native";

import { COLORS, SIZES, SHADOWS } from "../constants/theme";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { getUserProfile, updateUserPlan } from "../services/database";
import PaymentModal from "../components/PaymentModal";

export default function SubscriptionScreen() {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [userPlan, setUserPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(true);

  const loadPlan = async () => {
    if (!user) return;

    setLoadingPlan(true);

    const { data } = await getUserProfile(user.id);

    if (data?.plan) {
      setUserPlan(data.plan);
    }

    setLoadingPlan(false);
  };

  useEffect(() => {
    loadPlan();
  }, []);

  const openPaymentModal = (method) => {
    setSelectedMethod(method);
    setPaymentModalVisible(true);
  };

  const handlePaymentSuccess = async () => {
    if (!user) return;

    const { error } = await updateUserPlan(user.id, "pro");

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    setUserPlan("pro");

    Alert.alert(
      language === "en" ? "Pro Activated" : "Pro activé",
      language === "en"
        ? "Your account is now on the Pro plan."
        : "Votre compte est maintenant sur le plan Pro."
    );
  };

  const benefits =
    language === "en"
      ? [
          "Unlimited AI generations",
          "Advanced lead tracking",
          "Saved AI history",
          "WhatsApp-ready templates",
          "Priority business insights",
        ]
      : [
          "Générations IA illimitées",
          "Suivi avancé des clients",
          "Historique IA sauvegardé",
          "Modèles prêts pour WhatsApp",
          "Conseils business prioritaires",
        ];

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.upgrade}</Text>
        <Text style={styles.subtitle}>{t.upgradeSubtitle}</Text>

        {loadingPlan ? (
          <ActivityIndicator color={COLORS.primary} size="large" />
        ) : (
          <>
            <View style={userPlan === "pro" ? styles.activePlanCard : styles.heroCard}>
              <View style={styles.crownBox}>
                <Crown color="#FFFFFF" size={30} />
              </View>

              <Text style={styles.heroTitle}>
                {userPlan === "pro"
                  ? language === "en"
                    ? "You are on Pro"
                    : "Vous êtes sur Pro"
                  : language === "en"
                  ? "Unlock ClientFlow Pro"
                  : "Débloque ClientFlow Pro"}
              </Text>

              <Text style={styles.heroText}>
                {userPlan === "pro"
                  ? language === "en"
                    ? "You now have unlimited AI generations and premium tools."
                    : "Vous avez maintenant des générations IA illimitées et des outils premium."
                  : language === "en"
                  ? "Get unlimited AI tools to attract, follow up, and convert more clients."
                  : "Profite des outils IA illimités pour attirer, relancer et convertir plus de clients."}
              </Text>
            </View>

            <View style={styles.plan}>
              <Text style={styles.planName}>{t.free}</Text>
              <Text style={styles.price}>0 FCFA</Text>
              <Text style={styles.feature}>{t.freeFeature}</Text>
            </View>

            <View style={styles.planPro}>
              <View style={styles.planHeader}>
                <Text style={styles.planNamePro}>{t.proPlan}</Text>

                {userPlan === "pro" && (
                  <View style={styles.activeBadge}>
                    <Text style={styles.activeBadgeText}>
                      {language === "en" ? "ACTIVE" : "ACTIF"}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.pricePro}>5,000 FCFA {t.perMonth}</Text>

              {benefits.map((benefit) => (
                <View key={benefit} style={styles.benefitRow}>
                  <CheckCircle color={COLORS.success} size={18} />
                  <Text style={styles.featurePro}>{benefit}</Text>
                </View>
              ))}

              {userPlan !== "pro" ? (
                <>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => openPaymentModal("Mobile Money")}
                  >
                    <Smartphone color="#FFFFFF" size={19} />
                    <Text style={styles.buttonText}>{t.payMomo}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.orangeButton}
                    onPress={() => openPaymentModal("Orange Money")}
                  >
                    <Smartphone color="#FFFFFF" size={19} />
                    <Text style={styles.buttonText}>{t.payOrange}</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.proActiveBox}>
                  <CheckCircle color={COLORS.success} size={22} />
                  <Text style={styles.proActiveText}>
                    {language === "en"
                      ? "Pro features unlocked"
                      : "Fonctionnalités Pro débloquées"}
                  </Text>
                </View>
              )}
            </View>

            <Text style={styles.note}>
              {language === "en"
                ? "This demo simulates payment. In production, payment will be verified by a secure backend webhook before activating Pro."
                : "Cette démo simule le paiement. En production, le paiement sera vérifié par un webhook backend sécurisé avant l’activation Pro."}
            </Text>
          </>
        )}
      </ScrollView>

      <PaymentModal
        visible={paymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        paymentMethod={selectedMethod}
        onSuccess={handlePaymentSuccess}
      />
    </>
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
    lineHeight: 22,
  },

  heroCard: {
    backgroundColor: COLORS.dark,
    padding: 24,
    borderRadius: 24,
    marginBottom: 18,
  },

  activePlanCard: {
    backgroundColor: COLORS.success,
    padding: 24,
    borderRadius: 24,
    marginBottom: 18,
  },

  crownBox: {
    width: 62,
    height: 62,
    borderRadius: 22,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 10,
  },

  heroText: {
    color: "#F8FAFC",
    fontSize: 15,
    lineHeight: 23,
  },

  plan: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: SIZES.radius,
    marginBottom: 16,
    ...SHADOWS.card,
  },

  planPro: {
    backgroundColor: COLORS.card,
    padding: 22,
    borderRadius: SIZES.radius,
    marginBottom: 16,
    ...SHADOWS.card,
  },

  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  planName: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.dark,
  },

  planNamePro: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.dark,
  },

  activeBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  activeBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },

  price: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.primary,
    marginVertical: 12,
  },

  pricePro: {
    fontSize: 30,
    fontWeight: "900",
    color: COLORS.secondary,
    marginVertical: 12,
  },

  feature: {
    color: COLORS.muted,
    marginBottom: 6,
  },

  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  featurePro: {
    color: COLORS.text,
    fontWeight: "700",
    flex: 1,
  },

  button: {
    backgroundColor: COLORS.success,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  orangeButton: {
    backgroundColor: COLORS.secondary,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  proActiveBox: {
    backgroundColor: "#DCFCE7",
    padding: 16,
    borderRadius: 14,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  proActiveText: {
    color: COLORS.success,
    fontWeight: "900",
  },

  note: {
    color: COLORS.muted,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 40,
  },
});