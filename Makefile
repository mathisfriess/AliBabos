# Variables pour les fichiers docker-compose
INFRA_COMPOSE = infra/docker-compose.yml
IMAGE_COMPOSE = backend/image/docker-compose.yml
NETWORK_NAME = microservices-network

# Cibles non associées à des fichiers
.PHONY: all up down stop ps logs clean build network up-infra up-image down-infra down-image

# Cible par défaut
all: up

# Crée le réseau Docker si il n'existe pas
network:
	@echo "Création du réseau Docker '$(NETWORK_NAME)'..."
	@docker network create $(NETWORK_NAME) 2>/dev/null || echo "Le réseau '$(NETWORK_NAME)' existe déjà."

# Démarre tous les services
up: network up-infra up-image
	@echo "Tous les services sont démarrés."

# Alias pour 'up'
start: up

# Arrête tous les services
down: down-infra down-image
	@echo "Tous les services sont arrêtés."

# Alias pour 'down'
stop: down

# Démarre les services d'infrastructure
up-infra: network
	@echo "Démarrage des services d'infrastructure..."
	@docker compose -f $(INFRA_COMPOSE) up -d

# Démarre les services liés aux images
up-image: network
	@echo "Démarrage des services d'images..."
	@docker compose -f $(IMAGE_COMPOSE) up -d

# Arrête les services d'infrastructure
down-infra:
	@echo "Arrêt des services d'infrastructure..."
	@docker compose -f $(INFRA_COMPOSE) down

# Arrête les services liés aux images
down-image:
	@echo "Arrêt des services d'images..."
	@docker compose -f $(IMAGE_COMPOSE) down

# Reconstruit les images des services
build:
	@echo "Reconstruction des images..."
	@docker compose -f $(INFRA_COMPOSE) build --no-cache
	@docker compose -f $(IMAGE_COMPOSE) build --no-cache

# Affiche le statut des conteneurs
ps:
	@echo "--- Statut des services d'infrastructure ---"
	@docker compose -f $(INFRA_COMPOSE) ps
	@echo "\n--- Statut des services d'images ---"
	@docker compose -f $(IMAGE_COMPOSE) ps

# Affiche les logs de tous les services
logs:
	@echo "Affichage des logs de tous les services..."
	@docker compose -f $(INFRA_COMPOSE) logs -f & docker compose -f $(IMAGE_COMPOSE) logs -f

# Nettoie l'environnement (arrête et supprime conteneurs, réseaux et volumes)
clean:
	@echo "Nettoyage de l'environnement Docker..."
	@docker compose -f $(INFRA_COMPOSE) down -v
	@docker compose -f $(IMAGE_COMPOSE) down -v
	@docker network rm $(NETWORK_NAME) 2>/dev/null || echo "Le réseau '$(NETWORK_NAME)' a déjà été supprimé ou n'existait pas."
