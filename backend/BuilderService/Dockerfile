# ===== STAGE 1 : BUILD =====
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copier le projet Maven
COPY pom.xml .
COPY src ./src

# Build du jar (tests déjà exécutés dans la CI, on les saute ici)
RUN mvn -B clean package -DskipTests

# ===== STAGE 2 : RUNTIME =====
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copier le jar depuis le stage de build
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
