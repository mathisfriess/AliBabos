import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config({ path: ".env.cypress" });

function getKeycloakOrigin() {
  const url = process.env.KEYCLOAK_CYPRESS_AUTH_BASE_URL;
  if (!url) {
    throw new Error(
      "KEYCLOAK_CYPRESS_AUTH_BASE_URL n'est pas défini ! Vérifie ton .env.cypress."
    );
  }

  const parsed = new URL(url);
  return `${parsed.protocol}//${parsed.hostname}${
    parsed.port ? `:${parsed.port}` : ""
  }`;
}

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    setupNodeEvents(on, config) {
      config.env.keycloak_origin = getKeycloakOrigin();
      return config;
    },
    env: {
      keycloak_origin: getKeycloakOrigin(),
      auth_base_url: process.env.KEYCLOAK_CYPRESS_AUTH_BASE_URL,
      auth_realm: process.env.KEYCLOAK_CYPRESS_AUTH_REALM,
      auth_client_id: process.env.KEYCLOAK_CYPRESS_AUTH_CLIENT_ID,
      auth_username: process.env.KEYCLOAK_CYPRESS_AUTH_USERNAME,
      auth_password: process.env.KEYCLOAK_CYPRESS_AUTH_PASSWORD,
    },
  },
});
