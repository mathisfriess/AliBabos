"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initKeycloak } from "@/config/keycloakConfig";
import { useAuth } from "@/contexts/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function AuthGuard({ children, redirectTo = "/login" }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { setUser } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    initKeycloak({
      onLoad: "check-sso",
      checkLoginIframe: false,
      enableLogging: true,
    })
      .then(async (authenticated) => {
        if (!authenticated) {
          router.push(redirectTo);
          setIsLoading(false);
        } else {
          try {
            const kc = (await import("@/config/keycloakConfig")).getKeycloak();

            if (kc) {
              const userInfo = (await kc.loadUserInfo()) as Record<
                string,
                unknown
              >;
              setIsAuthenticated(true);

              if (userInfo && typeof userInfo === "object") {
                setUser({
                  sub: (userInfo.sub as string) || "",
                  email: userInfo.email as string | undefined,
                  email_verified: userInfo.email_verified as
                    | boolean
                    | undefined,
                  preferred_username: userInfo.preferred_username as
                    | string
                    | undefined,
                  given_name: userInfo.given_name as string | undefined,
                  family_name: userInfo.family_name as string | undefined,
                });
              }
            }

            setIsLoading(false);
          } catch (error) {
            console.error("Error loading user info:", error);
            setIsLoading(false);
          }
        }
      })
      .catch((error) => {
        console.error("Keycloak init error:", error);
        router.push(redirectTo);
        setIsLoading(false);
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
