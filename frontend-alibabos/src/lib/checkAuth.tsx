"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import keycloak, { initKeycloak } from "@/config/keycloakConfig";
import { useAuth } from "@/contexts/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function AuthGuard({ children, redirectTo = "/login" }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    initKeycloak({
      onLoad: "check-sso",
      pkceMethod: "S256",
    })
      .then(async (authenticated) => {
        if (!authenticated) {
          router.push(redirectTo);
        } else {
          const userInfo = await keycloak.loadUserInfo();
          setIsAuthenticated(true);
          setUser(userInfo);
          setIsLoading(false);
        }
      })
      .catch(() => {
        router.push(redirectTo);
      });
  }, [router, redirectTo, setUser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
