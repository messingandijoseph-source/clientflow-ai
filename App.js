import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import { LanguageProvider } from "./src/contexts/LanguageContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppNavigator />
      </LanguageProvider>
    </AuthProvider>
  );
}