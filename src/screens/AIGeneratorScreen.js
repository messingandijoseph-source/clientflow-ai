import React, { useState } from "react";
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

import { COLORS, SIZES, SHADOWS } from "../constants/theme";
import { generateAIContent } from "../services/openai";

const tools = [
  { id: "sales", label: "WhatsApp Sales Message" },
  { id: "followup", label: "Follow-up Message" },
  { id: "promo", label: "Promo Offer" },
  { id: "caption", label: "Facebook / Instagram Caption" },
];

export default function AIGeneratorScreen() {
  const [businessType, setBusinessType] = useState("");
  const [selectedTool, setSelectedTool] = useState("sales");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!businessType.trim()) {
      Alert.alert("Missing info", "Please enter your business type first.");
      return;
    }

    setLoading(true);
    setResult("");

    const content = await generateAIContent(businessType, selectedTool);

    setResult(content);
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>AI Generator</Text>

      <Text style={styles.subtitle}>
        Create sales messages, follow-ups and social content for your business.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Example: restaurant, fashion shop, real estate..."
        placeholderTextColor={COLORS.muted}
        value={businessType}
        onChangeText={setBusinessType}
      />

      <Text style={styles.sectionTitle}>Choose AI Tool</Text>

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
          <Text style={styles.buttonText}>Generate Content</Text>
        )}
      </TouchableOpacity>

      {result ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Generated Content</Text>
          <Text style={styles.result}>{result}</Text>
        </View>
      ) : (
        <Text style={styles.empty}>
          Your AI-generated content will appear here.
        </Text>
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

  empty: {
    color: COLORS.muted,
    fontSize: 15,
    textAlign: "center",
    marginTop: 30,
  },
});