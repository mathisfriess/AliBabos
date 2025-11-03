# Dockerfile pour Keycloak
FROM quay.io/keycloak/keycloak:latest

ENV KC_BOOTSTRAP_ADMIN_USERNAME=admin
ENV KC_BOOTSTRAP_ADMIN_PASSWORD=password
ENV KC_HOSTNAME_STRICT=false
ENV KC_HOSTNAME_STRICT_HTTPS=false
ENV KC_HTTP_ENABLED=true
ENV KC_PROXY=edge
ENV KC_HTTPS_REQUIRED=none
ENV KC_HTTP_PORT=8090

# Expose le port 8090
EXPOSE 8090

# Commande pour démarrer Keycloak
# CMD ["start"]
CMD ["kc.sh start --optimized"]
