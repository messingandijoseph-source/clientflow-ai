import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Smartphone, CheckCircle } from "lucide-react-native";

import { COLORS, SIZES } from "../constants/theme";
import { useLanguage } from "../contexts/LanguageContext";

export default function PaymentModal({
  visible,
  onClose,
  paymentMethod,
  onSuccess,
}) {
  const { language } = useLanguage();

  const [phone, setPhone] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    if (!phone.trim()) {
      Alert.alert(
        language === "en" ? "Missing phone number" : "Numéro manquant",
        language === "en"
          ? "Please enter your Mobile Money phone number."
          : "Veuillez entrer votre numéro Mobile Money."
      );
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        setPhone("");
        onSuccess?.();
        onClose();
      }, 1500);
    }, 2000);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {success ? (
            <>
              <View style={styles.successIcon}>
                <CheckCircle color="#FFFFFF" size={42} />
              </View>

              <Text style={styles.title}>
                {language === "en"
                  ? "Payment Successful"
                  : "Paiement réussi"}
              </Text>

              <Text style={styles.subtitle}>
                {language === "en"
                  ? "Your Pro plan will be activated shortly."
                  : "Votre plan Pro sera activé bientôt."}
              </Text>
            </>
          ) : (
            <>
              <View style={styles.iconBox}>
                <Smartphone color="#FFFFFF" size={34} />
              </View>

              <Text style={styles.title}>
                {language === "en"
                  ? `Pay with ${paymentMethod}`
                  : `Payer avec ${paymentMethod}`}
              </Text>

              <Text style={styles.subtitle}>
                {language === "en"
                  ? "Enter your phone number to simulate Mobile Money payment."
                  : "Entrez votre numéro pour simuler le paiement Mobile Money."}
              </Text>

              <TextInput
                style={styles.input}
                placeholder={
                  language === "en"
                    ? "Example: 6XXXXXXXX"
                    : "Exemple : 6XXXXXXXX"
                }
                placeholderTextColor={COLORS.muted}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />

              <TouchableOpacity style={styles.button} onPress={handlePayment}>
                {processing ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>
                    {language === "en" ? "Confirm Payment" : "Confirmer le paiement"}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={onClose}>
                <Text style={styles.cancel}>
                  {language === "en" ? "Cancel" : "Annuler"}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    padding: 20,
  },

  modal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
  },

  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  successIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.success,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.dark,
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },

  input: {
    width: "100%",
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    color: COLORS.dark,
    marginBottom: 16,
  },

  button: {
    width: "100%",
    backgroundColor: COLORS.success,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },

  cancel: {
    marginTop: 16,
    color: COLORS.muted,
    fontWeight: "800",
  },
});