import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  View,
} from "react-native";

import * as Linking from "expo-linking";

import { COLORS, SIZES, SHADOWS } from "../constants/theme";
import { generateAIContent } from "../services/openai";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import {
  saveGeneration,
  getTodayUsage,
  incrementTodayUsage,
  getUserProfile,
} from "../services/database";

const FREE_DAILY_LIMIT = 5;

export default function AIGeneratorScreen({ navigation }) {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const tools = [
    { id: "sales", label: t.salesMessage },
    { id: "followup", label: t.followupMessage },
    { id: "promo", label: t.promoOffer },
    { id: "caption", label: t.socialCaption },
  ];

  const [businessType, setBusinessType] = useState("");
  const [selectedTool, setSelectedTool] = useState("sales");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const [userPlan, setUserPlan] = useState("free");
  const [usageCount, setUsageCount] = useState(0);

  const loadUsageData = async () => {
    if (!user) return;

    const { data: profile } = await getUserProfile(user.id);
    const plan = profile?.plan || "free";
    setUserPlan(plan);

    const { data: usage } = await getTodayUsage(user.id);
    setUsageCount(usage?.generations_count || 0);
  };

  useEffect(() => {
    loadUsageData();
  }, []);

  const handleUpgrade = () => {
    navigation.navigate("Pro");
  };

  const handleGenerate = async () => {
    if (!businessType.trim()) {
      Alert.alert(t.missingInfo, t.fillAllFields);
      return;
    }

    if (!user) {
      Alert.alert(
        language === "en" ? "Login required" : "Connexion requise",
        language === "en"
          ? "Please login before generating content."
          : "Veuillez vous connecter avant de générer du contenu."
      );
      return;
    }

    setLoading(true);
    setResult("");

    const { data: profile } = await getUserProfile(user.id);
    const plan = profile?.plan || "free";
    setUserPlan(plan);

    const { data: usage } = await getTodayUsage(user.id);
    const currentUsage = usage?.generations_count || 0;
    setUsageCount(currentUsage);

    if (plan === "free" && currentUsage >= FREE_DAILY_LIMIT) {
      setLoading(false);

      Alert.alert(
        language === "en"
          ? "Daily limit reached"
          : "Limite quotidienne atteinte",
        language === "en"
          ? "Free users can generate 5 AI contents per day. Upgrade to Pro for unlimited generations."
          : "Les utilisateurs gratuits peuvent générer 5 contenus IA par jour. Passez à Pro pour des générations illimitées.",
        [
          {
            text: language === "en" ? "Cancel" : "Annuler",
            style: "cancel",
          },
          {
            text: language === "en" ? "Upgrade" : "Passer à Pro",
            onPress: handleUpgrade,
          },
        ]
      );

      return;
    }

    const content = await generateAIContent(
      businessType,
      selectedTool,
      language
    );

    setResult(content);

    await saveGeneration(user.id, businessType.trim(), selectedTool, content);

    await incrementTodayUsage(user.id);
    setUsageCount(currentUsage + 1);

    setLoading(false);
  };

  const shareToWhatsApp = async () => {
    if (!result) return;

    const url = `https://wa.me/?text=${encodeURIComponent(result)}`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        language === "en" ? "WhatsApp not found" : "WhatsApp introuvable"
      );
    }
  };

  const remaining = Math.max(FREE_DAILY_LIMIT - usageCount, 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>{t.aiGenerator}</Text>

      <Text style={styles.subtitle}>{t.aiSubtitle}</Text>

      <View style={styles.usageCard}>
        <Text style={styles.usageTitle}>
          {userPlan === "pro"
            ? language === "en"
              ? "Pro plan active"
              : "Plan Pro actif"
            : language === "en"
            ? "Free plan usage"
            : "Utilisation du plan gratuit"}
        </Text>

        <Text style={styles.usageText}>
          {userPlan === "pro"
            ? language === "en"
              ? "Unlimited AI generations"
              : "Générations IA illimitées"
            : language === "en"
            ? `${usageCount} / ${FREE_DAILY_LIMIT} generations used today • ${remaining} left`
            : `${usageCount} / ${FREE_DAILY_LIMIT} générations utilisées aujourd’hui • ${remaining} restantes`}
        </Text>

        {userPlan === "free" && (
          <TouchableOpacity style={styles.upgradeMiniButton} onPress={handleUpgrade}>
            <Text style={styles.upgradeMiniText}>
              {language === "en" ? "Upgrade to Pro" : "Passer à Pro"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder={t.businessPlaceholder}
        placeholderTextColor={COLORS.muted}
        value={businessType}
        onChangeText={setBusinessType}
      />

      <Text style={styles.sectionTitle}>{t.chooseTool}</Text>

      <View style={styles.toolGrid}>
        {tools.map((tool) => (
          <TouchableOpacity
            key={tool.id}
            style={[
              styles.toolCard,
              selectedTool === tool.id && styles.activeToolCard,
            ]}
            onPress={() => setSelectedTool(tool.id)}
          >
            <Text
              style={[
                styles.toolText,
                selectedTool === tool.id && styles.activeToolText,
              ]}
            >
              {tool.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGenerate}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>{t.generateContent}</Text>
        )}
      </TouchableOpacity>

      {result ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>{t.generatedContent}</Text>
          <Text style={styles.result}>{result}</Text>

          <TouchableOpacity
            style={styles.whatsappButton}
            onPress={shareToWhatsApp}
          >
            <Text style={styles.whatsappButtonText}>
              {language === "en" ? "Share to WhatsApp" : "Partager sur WhatsApp"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.empty}>{t.aiEmpty}</Text>
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
    marginBottom: 18,
    lineHeight: 22,
  },

  usageCard: {
    backgroundColor: COLORS.dark,
    padding: 18,
    borderRadius: SIZES.radius,
    marginBottom: 20,
  },

  usageTitle: {
    color: COLORS.secondary,
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 6,
  },

  usageText: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700",
  },

  upgradeMiniButton: {
    backgroundColor: COLORS.secondary,
    padding: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 14,
  },

  upgradeMiniText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  input: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: 18,
    fontSize: 15,
    color: COLORS.dark,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: COLORS.dark,
    marginBottom: 14,
  },

  toolGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 22,
  },

  toolCard: {
    width: "47%",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  activeToolCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  toolText: {
    color: COLORS.dark,
    fontWeight: "800",
    fontSize: 13,
    lineHeight: 18,
  },

  activeToolText: {
    color: "#FFFFFF",
  },

  button: {
    backgroundColor: COLORS.secondary,
    padding: 17,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 22,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },

  resultBox: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: SIZES.radius,
    marginBottom: 40,
    ...SHADOWS.card,
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.dark,
    marginBottom: 12,
  },

  result: {
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 25,
  },

  whatsappButton: {
    backgroundColor: "#25D366",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 18,
  },

  whatsappButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 15,
  },

  empty: {
    color: COLORS.muted,
    fontSize: 15,
    textAlign: "center",
    marginTop: 30,
  },
});