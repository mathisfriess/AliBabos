version: '3.9'

services:
  keycloak:
    image: quay.io/keycloak/keycloak:latest
    restart: unless-stopped
    ports: 
    - "8090"
    environment:
      KC_BOOTSTRAP_ADMIN_USERNAME: admin
      KC_BOOTSTRAP_ADMIN_PASSWORD: password
      # KC_HOSTNAME: raspberrypi.tail47bd1e.ts.net
      KC_HOSTNAME_STRICT: false
      KC_HOSTNAME_STRICT_HTTPS: false
      KC_HTTP_ENABLED: true
      KC_PROXY: edge
      KC_HTTPS_REQUIRED: none
    command: "start"