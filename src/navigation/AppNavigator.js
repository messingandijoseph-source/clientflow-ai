import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Wand2, Users, Crown } from "lucide-react-native";

import WelcomeScreen from "../screens/WelcomeScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AIGeneratorScreen from "../screens/AIGeneratorScreen";
import LeadsScreen from "../screens/LeadsScreen";
import SubscriptionScreen from "../screens/SubscriptionScreen";

import { COLORS } from "../constants/theme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: {
          height: 72,
          paddingBottom: 12,
          paddingTop: 10,
          borderTopWidth: 0,
          backgroundColor: "#FFFFFF",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="AI"
        component={AIGeneratorScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Wand2 color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Leads"
        component={LeadsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Pro"
        component={SubscriptionScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Crown color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}