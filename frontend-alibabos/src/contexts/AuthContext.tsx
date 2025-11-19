"use client";

import { createContext, useContext, useState } from "react";
import { getKeycloak } from "@/config/keycloakConfig";
import type Keycloak from "keycloak-js";

export interface KeycloakUserInfo {
  sub: string;
  email?: string;
  email_verified?: boolean;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
}

interface AuthContextType {
  user: KeycloakUserInfo | null;
  setUser: (user: KeycloakUserInfo | null) => void;
  keycloak: Keycloak;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<KeycloakUserInfo | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser, keycloak: getKeycloak()! }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
