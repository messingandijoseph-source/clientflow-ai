import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { COLORS, SIZES } from "../constants/theme";

export default function SignupScreen({ navigation }) {
  const { signUp } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !businessName || !email || !password) {
      Alert.alert(t.missingInfo, t.fillAllFields);
      return;
    }

    setLoading(true);

    const { error } = await signUp(
      email.trim(),
      password,
      fullName.trim(),
      businessName.trim()
    );

    setLoading(false);

    if (error) {
      Alert.alert("Signup failed", error.message);
      return;
    }

    Alert.alert(t.accountCreated, t.accountCreatedText);

    navigation.navigate("Login");
  };

  return (
    <LinearGradient colors={["#2563EB", "#0F172A"]} style={styles.container}>
      <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
        <Text style={styles.langText}>{language === "en" ? "FR" : "EN"}</Text>
      </TouchableOpacity>

      <Text style={styles.logo}>{t.appName}</Text>
      <Text style={styles.subtitle}>{t.signupTitle}</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder={t.fullName}
          placeholderTextColor={COLORS.muted}
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          style={styles.input}
          placeholder={t.businessName}
          placeholderTextColor={COLORS.muted}
          value={businessName}
          onChangeText={setBusinessName}
        />

        <TextInput
          style={styles.input}
          placeholder={t.email}
          placeholderTextColor={COLORS.muted}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder={t.password}
          placeholderTextColor={COLORS.muted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>{t.createAccount}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>{t.alreadyAccount}</Text>
        </TouchableOpacity>
      </View>
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

  logo: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "900",
    marginBottom: 8,
  },

  subtitle: {
    color: "#CBD5E1",
    fontSize: 16,
    marginBottom: 28,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 22,
  },

  input: {
    backgroundColor: COLORS.background,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    color: COLORS.dark,
  },

  button: {
    backgroundColor: COLORS.secondary,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },

  link: {
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 18,
    fontWeight: "800",
  },
});