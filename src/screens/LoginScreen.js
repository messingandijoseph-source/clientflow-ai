import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../contexts/AuthContext";
import { BRAND } from "../constants/brand";
import { COLORS, SIZES } from "../constants/theme";

export default function LoginScreen({ navigation }) {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing info", "Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } = await signIn(email.trim(), password);

    setLoading(false);

    if (error) {
      Alert.alert("Login failed", error.message);
    }
  };

  return (
    <LinearGradient colors={["#2563EB", "#0F172A"]} style={styles.container}>
      <Text style={styles.logo}>{BRAND.name}</Text>
      <Text style={styles.subtitle}>Login to manage your clients</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor={COLORS.muted}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={COLORS.muted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>No account? Create one</Text>
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
    backgroundColor: COLORS.primary,
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