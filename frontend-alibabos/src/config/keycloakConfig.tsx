if (
  typeof window !== "undefined" &&
  (!window.crypto || !window.crypto.subtle)
) {
  try {
    Object.defineProperty(window, "crypto", {
      value: {
        getRandomValues: function (buffer: Uint8Array) {
          for (let i = 0; i < buffer.length; i++) {
            buffer[i] = Math.floor(Math.random() * 256);
          }
          return buffer;
        },
        subtle: {
          digest: async function () {
            return new Uint8Array(32).buffer;
          },
        },
      },
      writable: true,
      configurable: true,
    });
  } catch (e) {
    console.warn("Cannot polyfill crypto API:", e);
  }
}

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
