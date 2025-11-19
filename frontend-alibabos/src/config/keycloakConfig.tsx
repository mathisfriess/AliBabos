import Keycloak from "keycloak-js";

let keycloakInstance: Keycloak.KeycloakInstance | null = null;

export const getKeycloak = () => {
  if (!keycloakInstance && typeof window !== "undefined") {
    keycloakInstance = new Keycloak({
      url: process.env.NEXT_PUBLIC_KEYCLOAK_URL!,
      realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM!,
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!,
    });
  }
  return keycloakInstance;
};

export const initKeycloak = async (config?: Keycloak.KeycloakInitOptions) => {
  const kc = getKeycloak();
  if (!kc) return false; // côté serveur
  return kc.init(
    config || {
      onLoad: "check-sso",
      flow: "standard",
      checkLoginIframe: false,
      enableLogging: true,
    }
  );
};
