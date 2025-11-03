FROM quay.io/keycloak/keycloak:latest

ENV KC_HTTP_ENABLED=true
ENV KC_HTTP_PORT=8090
ENV KC_HOSTNAME_STRICT=false
ENV KC_HOSTNAME_STRICT_HTTPS=false
ENV KC_PROXY=edge
ENV KC_HTTPS_REQUIRED=none
ENV KC_DB=postgres

EXPOSE 8090

CMD ["start", "--optimized"]
