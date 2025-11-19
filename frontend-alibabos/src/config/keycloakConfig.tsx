import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://localhost:7080",
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "alibabos",
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "frontend-alibabos",
};

const keycloak = new Keycloak(keycloakConfig);

let isInitialized = false;

export const initKeycloak = async (config?: Keycloak.KeycloakInitOptions) => {
  if (!isInitialized) {
    try {
      const authenticated = await keycloak.init(
        config || {
          onLoad: "check-sso",
          pkceMethod: "S256",
        }
      );
      isInitialized = true;
      return authenticated;
    } catch (error) {
      console.error("Keycloak init failed:", error);
      throw error;
    }
  }
  return keycloak.authenticated || false;
};

export default keycloak;
