"use client";

import { useEffect } from "react";
import { getKeycloak, initKeycloak } from "../../../config/keycloakConfig";

function LoginPage() {
  useEffect(() => {
    initKeycloak()
      .then((authenticated) => {
        const keycloak = getKeycloak();
        if (!authenticated) {
          keycloak?.login({
            redirectUri: window.location.origin + "/profile",
          });
        } else {
          window.location.href = "/profile";
        }
      })
      .catch((error) => {
        console.error("Failed to initialize:", error);
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4">Redirecting to login...</p>
      </div>
    </div>
  );
}

export default LoginPage;
