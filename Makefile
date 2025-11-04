.PHONY: dev, init-network, stop, remove

init-network:
	@docker network inspect alibabos-network >/dev/null 2>&1 || \
		docker network create alibabos-network

init-infra: init-network
	docker compose -f infra/docker-compose.yml up --build -d

init-eureka: init-network
	docker build -t eureka-server ./backend/eureka-server
	docker run -d --network alibabos-network -p 8761:8761

stop-eureka:
	docker rm -f $$(docker ps -q --filter ancestor=eureka-server) || true

init-gateway: init-network
	docker build -t graphql-gateway ./backend/graphql-gateway
	docker run -d --network alibabos-network -p 8080:8080 graphql-gateway

stop-gateway:
	docker rm -f $$(docker ps -q --filter ancestor=graphql-gateway) || true

stop:
	docker compose -f infra/docker-compose.yml down

remove: stop
	docker network rm alibabos-network || true

dev: init-infra

stop-dev: stop remove
