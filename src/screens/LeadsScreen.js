import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import * as Linking from "expo-linking";
import { Plus, User, Phone, Briefcase, MessageCircle } from "lucide-react-native";

import { COLORS, SIZES, SHADOWS } from "../constants/theme";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { createLead, getLeads } from "../services/database";
import { supabase } from "../services/supabase";

const STATUS_OPTIONS = ["New", "Contacted", "Negotiating", "Converted", "Lost"];

export default function LeadsScreen() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);

  const [clientName, setClientName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [phone, setPhone] = useState("");

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLeads = async () => {
    if (!user) return;

    setLoading(true);

    const { data, error } = await getLeads(user.id);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setLeads(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleAddLead = async () => {
    if (!clientName.trim() || !businessType.trim()) {
      Alert.alert(t.missingInfo, t.fillAllFields);
      return;
    }

    const { error } = await createLead(
      user.id,
      clientName.trim(),
      businessType.trim(),
      phone.trim()
    );

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    setClientName("");
    setBusinessType("");
    setPhone("");
    setModalVisible(false);

    loadLeads();
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus })
      .eq("id", leadId);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    loadLeads();
  };

  const openWhatsApp = async (phoneNumber) => {
    if (!phoneNumber) {
      Alert.alert(
        language === "en" ? "No phone number" : "Aucun numéro",
        language === "en"
          ? "This lead does not have a phone number."
          : "Ce client n’a pas de numéro enregistré."
      );
      return;
    }

    const cleanedPhone = phoneNumber.replace(/\D/g, "");
    const url = `https://wa.me/${cleanedPhone}`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        language === "en" ? "WhatsApp not found" : "WhatsApp introuvable"
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "#3B82F6";
      case "Contacted":
        return "#F59E0B";
      case "Negotiating":
        return "#8B5CF6";
      case "Converted":
        return "#10B981";
      case "Lost":
        return "#EF4444";
      default:
        return COLORS.primary;
    }
  };

  const translateStatus = (status) => {
    if (language === "en") return status;

    const labels = {
      New: "Nouveau",
      Contacted: "Contacté",
      Negotiating: "Négociation",
      Converted: "Converti",
      Lost: "Perdu",
    };

    return labels[status] || status;
  };

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>{t.leadsTitle}</Text>
            <Text style={styles.subtitle}>{t.leadsSubtitle}</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Plus color="#FFFFFF" size={24} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator color={COLORS.primary} size="large" />
        ) : leads.length === 0 ? (
          <View style={styles.emptyCard}>
            <User color={COLORS.primary} size={34} />
            <Text style={styles.emptyTitle}>{t.noLeads}</Text>
            <Text style={styles.emptyText}>{t.noLeadsText}</Text>
          </View>
        ) : (
          leads.map((lead) => (
            <View key={lead.id} style={styles.leadCard}>
              <View style={styles.leadTop}>
                <View style={styles.leadInfo}>
                  <Text style={styles.clientName}>{lead.client_name}</Text>

                  <View style={styles.row}>
                    <Briefcase color={COLORS.muted} size={14} />
                    <Text style={styles.businessType}>{lead.business_type}</Text>
                  </View>

                  {lead.phone ? (
                    <View style={styles.row}>
                      <Phone color={COLORS.muted} size={14} />
                      <Text style={styles.businessType}>{lead.phone}</Text>
                    </View>
                  ) : null}
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(lead.status) },
                  ]}
                >
                  <Text style={styles.statusText}>
                    {translateStatus(lead.status)}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.whatsappButton}
                onPress={() => openWhatsApp(lead.phone)}
              >
                <MessageCircle color="#FFFFFF" size={18} />
                <Text style={styles.whatsappText}>
                  {language === "en" ? "Message on WhatsApp" : "Écrire sur WhatsApp"}
                </Text>
              </TouchableOpacity>

              <View style={styles.pipelineBox}>
                <Text style={styles.pipelineLabel}>
                  {language === "en"
                    ? "Update Pipeline"
                    : "Mettre à jour le pipeline"}
                </Text>

                <Picker
                  selectedValue={lead.status}
                  onValueChange={(value) => updateLeadStatus(lead.id, value)}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <Picker.Item
                      key={status}
                      label={translateStatus(status)}
                      value={status}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{t.addNewLead}</Text>

            <View style={styles.inputBox}>
              <User color={COLORS.muted} size={18} />
              <TextInput
                style={styles.input}
                placeholder={t.clientName}
                placeholderTextColor={COLORS.muted}
                value={clientName}
                onChangeText={setClientName}
              />
            </View>

            <View style={styles.inputBox}>
              <Briefcase color={COLORS.muted} size={18} />
              <TextInput
                style={styles.input}
                placeholder={t.businessType}
                placeholderTextColor={COLORS.muted}
                value={businessType}
                onChangeText={setBusinessType}
              />
            </View>

            <View style={styles.inputBox}>
              <Phone color={COLORS.muted} size={18} />
              <TextInput
                style={styles.input}
                placeholder={
                  language === "en"
                    ? "Phone number with country code"
                    : "Numéro avec indicatif pays"
                }
                placeholderTextColor={COLORS.muted}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleAddLead}>
              <Text style={styles.saveButtonText}>{t.saveLead}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>{t.cancel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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
    marginBottom: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: "900",
    color: COLORS.dark,
  },

  subtitle: {
    color: COLORS.muted,
    marginTop: 8,
    width: 250,
    lineHeight: 22,
  },

  addButton: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
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

  leadCard: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: SIZES.radius,
    marginBottom: 16,
    ...SHADOWS.card,
  },

  leadTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  leadInfo: {
    flex: 1,
    paddingRight: 10,
  },

  clientName: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.dark,
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 5,
  },

  businessType: {
    color: COLORS.muted,
    fontWeight: "700",
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  statusText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 12,
  },

  whatsappButton: {
    backgroundColor: "#25D366",
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },

  whatsappText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  pipelineBox: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  pipelineLabel: {
    fontWeight: "800",
    color: COLORS.dark,
    marginBottom: 6,
    marginTop: 4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },

  modal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.dark,
    marginBottom: 22,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  input: {
    flex: 1,
    padding: 16,
    color: COLORS.dark,
  },

  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },

  cancelButton: {
    alignItems: "center",
    marginTop: 16,
  },

  cancelText: {
    color: COLORS.muted,
    fontWeight: "800",
  },
});