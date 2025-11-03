# Dockerfile pour Keycloak avec PostgreSQL externe
FROM quay.io/keycloak/keycloak:latest

# Admin Keycloak
ENV KC_BOOTSTRAP_ADMIN_USERNAME=admin
ENV KC_BOOTSTRAP_ADMIN_PASSWORD=password

# HTTP & ports
ENV KC_HTTP_ENABLED=true
ENV KC_HTTP_PORT=8090
ENV KC_HOSTNAME_STRICT=false
ENV KC_HOSTNAME_STRICT_HTTPS=false
ENV KC_PROXY=edge
ENV KC_HTTPS_REQUIRED=none

# Database configuration (PostgreSQL)
ENV KC_DB=postgres
ENV KC_DB_USERNAME=postgres
ENV KC_DB_PASSWORD=aaatob2ywbdl6v8q
ENV KC_DB_URL_HOST=alibabos-db-0dkrh4
ENV KC_DB_URL_PORT=5432
ENV KC_DB_URL_DATABASE=postgres

# Expose le port 8090
EXPOSE 8090

# Commande pour démarrer Keycloak
CMD ["start", "--optimized"]
