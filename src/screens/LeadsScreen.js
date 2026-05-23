import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";

import { Plus } from "lucide-react-native";
import { COLORS, SIZES, SHADOWS } from "../constants/theme";
import { initialLeads } from "../data/mockData";

export default function LeadsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [leads, setLeads] = useState(initialLeads);

  const addLead = () => {
    if (!leadName.trim() || !businessType.trim()) return;

    const newLead = {
      id: Date.now(),
      name: leadName,
      type: businessType,
      status: "New",
    };

    setLeads([newLead, ...leads]);
    setLeadName("");
    setBusinessType("");
    setModalVisible(false);
  };

  const getStatusColor = (status) => {
    if (status === "Hot Lead") return COLORS.danger;
    if (status === "Contacted") return COLORS.warning;
    if (status === "Converted") return COLORS.success;
    return COLORS.primary;
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Leads</Text>
        <Text style={styles.subtitle}>
          Manage your potential customers and follow-ups.
        </Text>

        {leads.map((lead) => (
          <View key={lead.id} style={styles.card}>
            <View>
              <Text style={styles.name}>{lead.name}</Text>
              <Text style={styles.type}>{lead.type}</Text>
            </View>

            <View
              style={[
                styles.badge,
                { backgroundColor: getStatusColor(lead.status) },
              ]}
            >
              <Text style={styles.badgeText}>{lead.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Plus color="#FFFFFF" size={28} />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Lead</Text>

            <TextInput
              placeholder="Client name"
              placeholderTextColor={COLORS.muted}
              style={styles.input}
              value={leadName}
              onChangeText={setLeadName}
            />

            <TextInput
              placeholder="Business type"
              placeholderTextColor={COLORS.muted}
              style={styles.input}
              value={businessType}
              onChangeText={setBusinessType}
            />

            <TouchableOpacity style={styles.addButton} onPress={addLead}>
              <Text style={styles.addButtonText}>Add Lead</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  card: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: SIZES.radius,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...SHADOWS.card,
  },
  name: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.dark,
  },
  type: {
    color: COLORS.muted,
    marginTop: 5,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
  },
  badgeText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 12,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 32,
    backgroundColor: COLORS.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 20,
    color: COLORS.dark,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    color: COLORS.dark,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },
  cancel: {
    textAlign: "center",
    marginTop: 18,
    color: COLORS.muted,
    fontWeight: "700",
  },
});