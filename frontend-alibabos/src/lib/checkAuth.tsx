"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import keycloak, { initKeycloak } from "@/config/keycloakConfig";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function AuthGuard({ children, redirectTo = "/login" }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    initKeycloak({
      onLoad: "check-sso",
      pkceMethod: "S256",
    })
      .then((authenticated) => {
        if (!authenticated) {
          router.push(redirectTo);
        } else {
          setIsAuthenticated(true);
          setIsLoading(false);
        }
      })
      .catch(() => {
        router.push(redirectTo);
      });
  }, [router, redirectTo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
