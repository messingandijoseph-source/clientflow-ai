import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";

import * as Clipboard from "expo-clipboard";

import { Clock, Copy, Check, Trash2 } from "lucide-react-native";

import { COLORS, SIZES, SHADOWS } from "../constants/theme";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { getGenerations, deleteGeneration } from "../services/database";

export default function AIHistoryScreen() {
  const { user } = useAuth();
  const { language } = useLanguage();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const loadHistory = async () => {
    if (!user) return;

    setLoading(true);

    const { data, error } = await getGenerations(user.id);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setHistory(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const copyToClipboard = async (text, id) => {
    await Clipboard.setStringAsync(text);
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleDelete = (generationId) => {
    Alert.alert(
      language === "en" ? "Delete history" : "Supprimer l’historique",
      language === "en"
        ? "Are you sure you want to delete this AI generation?"
        : "Voulez-vous vraiment supprimer cette génération IA ?",
      [
        {
          text: language === "en" ? "Cancel" : "Annuler",
          style: "cancel",
        },
        {
          text: language === "en" ? "Delete" : "Supprimer",
          style: "destructive",
          onPress: async () => {
            const { error } = await deleteGeneration(generationId);

            if (error) {
              Alert.alert("Error", error.message);
              return;
            }

            setHistory((current) =>
              current.filter((item) => item.id !== generationId)
            );
          },
        },
      ]
    );
  };

  const getTypeLabel = (type) => {
    const labels = {
      sales: language === "en" ? "Sales Message" : "Message de vente",
      followup: language === "en" ? "Follow-up" : "Relance",
      promo: language === "en" ? "Promo Offer" : "Offre promo",
      caption: language === "en" ? "Social Caption" : "Légende sociale",
    };

    return labels[type] || type;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>
        {language === "en" ? "AI History" : "Historique IA"}
      </Text>

      <Text style={styles.subtitle}>
        {language === "en"
          ? "View, copy and delete your previously generated business content."
          : "Consulte, copie et supprime tes anciens contenus générés par l’IA."}
      </Text>

      {loading ? (
        <ActivityIndicator color={COLORS.primary} size="large" />
      ) : history.length === 0 ? (
        <View style={styles.emptyCard}>
          <Clock color={COLORS.primary} size={34} />

          <Text style={styles.emptyTitle}>
            {language === "en" ? "No history yet" : "Aucun historique"}
          </Text>

          <Text style={styles.emptyText}>
            {language === "en"
              ? "Generate AI content first, then it will appear here."
              : "Génère d’abord du contenu IA, puis il apparaîtra ici."}
          </Text>
        </View>
      ) : (
        history.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.headerTextBox}>
                <Text style={styles.type}>
                  {getTypeLabel(item.content_type)}
                </Text>

                <Text style={styles.business}>{item.business_type}</Text>
              </View>

              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() =>
                    copyToClipboard(item.generated_content, item.id)
                  }
                >
                  {copiedId === item.id ? (
                    <Check color="#FFFFFF" size={18} />
                  ) : (
                    <Copy color="#FFFFFF" size={18} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Trash2 color="#FFFFFF" size={18} />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.content}>{item.generated_content}</Text>

            <Text style={styles.date}>
              {new Date(item.created_at).toLocaleString()}
            </Text>
          </View>
        ))
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
    marginBottom: 24,
    lineHeight: 22,
  },

  emptyCard: {
    backgroundColor: COLORS.card,
    padding: 28,
    borderRadius: SIZES.radius,
    alignItems: "center",
    ...SHADOWS.card,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.dark,
    marginTop: 14,
    marginBottom: 8,
  },

  emptyText: {
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 22,
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: SIZES.radius,
    marginBottom: 16,
    ...SHADOWS.card,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  headerTextBox: {
    flex: 1,
    paddingRight: 10,
  },

  actionsRow: {
    flexDirection: "row",
    gap: 8,
  },

  type: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "900",
  },

  business: {
    color: COLORS.muted,
    marginTop: 4,
    fontWeight: "700",
  },

  copyButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.danger,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 23,
  },

  date: {
    marginTop: 14,
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
  },
});