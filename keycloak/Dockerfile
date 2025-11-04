# FROM quay.io/keycloak/keycloak:latest

# ENV KC_HTTP_ENABLED=true
# ENV KC_HTTP_PORT=8090
# ENV KC_HOSTNAME_STRICT=false
# ENV KC_HOSTNAME_STRICT_HTTPS=false
# ENV KC_PROXY=edge
# ENV KC_HTTPS_REQUIRED=none
# ENV KC_DB=postgres

# EXPOSE 8090

# CMD ["start"]
# # CMD ["start", "--optimized"]

FROM quay.io/keycloak/keycloak:latest 
# Admin Keycloak 
ENV KC_BOOTSTRAP_ADMIN_USERNAME=admin 
ENV KC_BOOTSTRAP_ADMIN_PASSWORD=${{project.BOOTSTRAP_PASSWORD}} 
# HTTP & ports 
ENV KC_HTTP_ENABLED=true 
ENV KC_HTTP_PORT=8090 
ENV KC_HOSTNAME_STRICT=false 
ENV KC_HOSTNAME_STRICT_HTTPS=false 
ENV KC_PROXY=edge 
ENV KC_HTTPS_REQUIRED=none 
# Database configuration (PostgreSQL) 
ENV KC_DB=postgres 
ENV KC_DB_USERNAME=${{DB_USERNAME}} 
ENV KC_DB_PASSWORD=${{DB_PASSWORD}}
ENV KC_DB_URL_HOST=${{project.DB_HOST}}
ENV KC_DB_URL_PORT=5432 
ENV KC_DB_URL_DATABASE=postgres 
# Expose le port 8090 
EXPOSE 8090 
# Commande pour démarrer Keycloak 
CMD ["start"] 
# CMD ["start", "--optimized"]
#  DATABASE_URL=${{project.DATABASE_URL}}