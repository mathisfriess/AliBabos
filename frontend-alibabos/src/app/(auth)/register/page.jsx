"use client";

import { useEffect } from "react";
import keycloak, { initKeycloak } from "../../../config/keycloakConfig";

function RegisterPage() {
  useEffect(() => {
    initKeycloak()
      .then((authenticated) => {
        if (!authenticated) {
          keycloak.register({
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
        <p className="mt-4">Redirecting to register...</p>
      </div>
    </div>
  );
}

export default RegisterPage;
