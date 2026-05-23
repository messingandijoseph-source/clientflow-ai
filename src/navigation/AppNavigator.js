import React from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Home,
  Wand2,
  Users,
  Crown,
  UserCircle,
  History,
} from "lucide-react-native";

import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AIGeneratorScreen from "../screens/AIGeneratorScreen";
import LeadsScreen from "../screens/LeadsScreen";
import SubscriptionScreen from "../screens/SubscriptionScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AIHistoryScreen from "../screens/AIHistoryScreen";

import { COLORS } from "../constants/theme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function LoadingScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}

function MainTabs() {
  const { t, language } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: {
          height: 74,
          paddingBottom: 12,
          paddingTop: 10,
          borderTopWidth: 0,
          backgroundColor: "#FFFFFF",
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: t.dashboard,
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="AI"
        component={AIGeneratorScreen}
        options={{
          tabBarLabel: t.ai,
          tabBarIcon: ({ color, size }) => <Wand2 color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="History"
        component={AIHistoryScreen}
        options={{
          tabBarLabel: language === "en" ? "History" : "Historique",
          tabBarIcon: ({ color, size }) => (
            <History color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Leads"
        component={LeadsScreen}
        options={{
          tabBarLabel: t.leads,
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Pro"
        component={SubscriptionScreen}
        options={{
          tabBarLabel: t.pro,
          tabBarIcon: ({ color, size }) => <Crown color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: language === "en" ? "Profile" : "Profil",
          tabBarIcon: ({ color, size }) => (
            <UserCircle color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}