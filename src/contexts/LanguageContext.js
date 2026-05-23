import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageContext = createContext({});

const LANGUAGE_STORAGE_KEY = "clientflow_language";

const translations = {
  en: {
    appName: "ClientFlow AI",
    slogan: "AI Sales Assistant for African Businesses",
    switchTo: "FR",
    english: "English",
    french: "Français",

    dashboard: "Dashboard",
    ai: "AI",
    leads: "Leads",
    pro: "Pro",

    welcomeTitle: "Win more clients with AI",
    welcomeText:
      "Generate WhatsApp sales messages, follow-ups, promo offers and social media captions for your business in seconds.",
    getStarted: "Get Started",
    builtFor: "Built for African business owners",

    loginTitle: "Login to manage your clients",
    signupTitle: "Create your business account",
    email: "Email address",
    password: "Password",
    fullName: "Full name",
    businessName: "Business name",
    login: "Login",
    createAccount: "Create Account",
    noAccount: "No account? Create one",
    alreadyAccount: "Already have an account? Login",
    missingInfo: "Missing info",
    fillAllFields: "Please fill all fields.",
    enterEmailPassword: "Please enter your email and password.",
    accountCreated: "Account created",
    accountCreatedText: "Your account was created successfully.",

    welcomeBack: "Welcome back 👋",
    totalLeads: "Total Leads",
    hotLeads: "Hot Leads",
    converted: "Converted",
    conversion: "Conversion",
    aiInsight: "AI Business Insight",
    followUpTitle: "Follow up your warm leads today",
    followUpText:
      "Send a short, personal WhatsApp message today to increase your chances of closing more clients.",
    bestChannel: "Best Channel",
    bestChannelText:
      "WhatsApp is your strongest conversion channel. Focus on short offers, testimonials, urgency, and direct calls to action.",
    suggestedAction: "Suggested Action",
    suggestedActionText:
      "Generate a follow-up message for your hot leads and send it before the end of the day.",

    aiGenerator: "AI Generator",
    aiSubtitle:
      "Create sales messages, follow-ups and social content for your business.",
    businessPlaceholder: "Example: restaurant, fashion shop, real estate...",
    chooseTool: "Choose AI Tool",
    salesMessage: "WhatsApp Sales Message",
    followupMessage: "Follow-up Message",
    promoOffer: "Promo Offer",
    socialCaption: "Facebook / Instagram Caption",
    generateContent: "Generate Content",
    generatedContent: "Generated Content",
    aiEmpty: "Your AI-generated content will appear here.",

    leadsTitle: "Leads",
    leadsSubtitle: "Manage your real customer leads from your database.",
    noLeads: "No leads yet",
    noLeadsText: "Tap the + button to add your first customer lead.",
    addNewLead: "Add New Lead",
    clientName: "Client name",
    businessType: "Business type",
    saveLead: "Save Lead",
    cancel: "Cancel",
    newStatus: "New",

    upgrade: "Upgrade",
    upgradeSubtitle: "Unlock unlimited AI sales tools for your business.",
    free: "Free",
    proPlan: "Pro",
    perMonth: "/ month",
    freeFeature: "5 AI generations per day",
    unlimitedAI: "Unlimited AI generations",
    leadTracking: "Lead tracking",
    whatsappTemplates: "WhatsApp templates",
    payMomo: "Pay with Mobile Money",
    payOrange: "Pay with Orange Money",
  },

  fr: {
    appName: "ClientFlow AI",
    slogan: "Assistant commercial IA pour les entreprises africaines",
    switchTo: "EN",
    english: "English",
    french: "Français",

    dashboard: "Accueil",
    ai: "IA",
    leads: "Clients",
    pro: "Pro",

    welcomeTitle: "Gagne plus de clients avec l’IA",
    welcomeText:
      "Génère des messages WhatsApp, des relances, des offres promotionnelles et des légendes pour les réseaux sociaux en quelques secondes.",
    getStarted: "Commencer",
    builtFor: "Conçu pour les entrepreneurs africains",

    loginTitle: "Connecte-toi pour gérer tes clients",
    signupTitle: "Crée ton compte business",
    email: "Adresse email",
    password: "Mot de passe",
    fullName: "Nom complet",
    businessName: "Nom de l’entreprise",
    login: "Connexion",
    createAccount: "Créer un compte",
    noAccount: "Pas encore de compte ? Crée-en un",
    alreadyAccount: "Déjà un compte ? Connecte-toi",
    missingInfo: "Informations manquantes",
    fillAllFields: "Veuillez remplir tous les champs.",
    enterEmailPassword: "Veuillez entrer votre email et votre mot de passe.",
    accountCreated: "Compte créé",
    accountCreatedText: "Votre compte a été créé avec succès.",

    welcomeBack: "Bon retour 👋",
    totalLeads: "Prospects",
    hotLeads: "Clients chauds",
    converted: "Convertis",
    conversion: "Conversion",
    aiInsight: "Conseil IA Business",
    followUpTitle: "Relance tes prospects aujourd’hui",
    followUpText:
      "Envoie un court message WhatsApp personnalisé aujourd’hui pour augmenter tes chances de conclure plus de clients.",
    bestChannel: "Meilleur canal",
    bestChannelText:
      "WhatsApp est ton canal de conversion le plus fort. Concentre-toi sur des offres courtes, des témoignages, l’urgence et des appels à l’action directs.",
    suggestedAction: "Action recommandée",
    suggestedActionText:
      "Génère un message de relance pour tes prospects chauds et envoie-le avant la fin de la journée.",

    aiGenerator: "Générateur IA",
    aiSubtitle:
      "Crée des messages de vente, des relances et du contenu social pour ton business.",
    businessPlaceholder: "Exemple : restaurant, boutique, immobilier...",
    chooseTool: "Choisir un outil IA",
    salesMessage: "Message de vente WhatsApp",
    followupMessage: "Message de relance",
    promoOffer: "Offre promotionnelle",
    socialCaption: "Légende Facebook / Instagram",
    generateContent: "Générer le contenu",
    generatedContent: "Contenu généré",
    aiEmpty: "Ton contenu généré par l’IA apparaîtra ici.",

    leadsTitle: "Clients",
    leadsSubtitle: "Gère tes vrais prospects depuis ta base de données.",
    noLeads: "Aucun client pour le moment",
    noLeadsText: "Appuie sur le bouton + pour ajouter ton premier prospect.",
    addNewLead: "Ajouter un client",
    clientName: "Nom du client",
    businessType: "Type de business",
    saveLead: "Enregistrer",
    cancel: "Annuler",
    newStatus: "Nouveau",

    upgrade: "Passer à Pro",
    upgradeSubtitle: "Débloque les outils IA illimités pour ton business.",
    free: "Gratuit",
    proPlan: "Pro",
    perMonth: "/ mois",
    freeFeature: "5 générations IA par jour",
    unlimitedAI: "Générations IA illimitées",
    leadTracking: "Suivi des clients",
    whatsappTemplates: "Modèles WhatsApp",
    payMomo: "Payer avec Mobile Money",
    payOrange: "Payer avec Orange Money",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [loadingLanguage, setLoadingLanguage] = useState(true);

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

      if (savedLanguage === "en" || savedLanguage === "fr") {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.log("Language load error:", error);
    } finally {
      setLoadingLanguage(false);
    }
  };

  const toggleLanguage = async () => {
    const nextLanguage = language === "en" ? "fr" : "en";

    setLanguage(nextLanguage);

    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch (error) {
      console.log("Language save error:", error);
    }
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        t,
        loadingLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}