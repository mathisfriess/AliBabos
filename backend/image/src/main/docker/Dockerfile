# Runtime-only Dockerfile : copie uniquement le JAR déjà construit
FROM eclipse-temurin:21-jre
WORKDIR /app
RUN useradd -r -u 1001 spring && mkdir -p /app && chown -R spring:spring /app
ENV SPRING_PROFILES_ACTIVE=default
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75 -XX:InitialRAMPercentage=50"
COPY target/*.jar /app/app.jar
USER spring
EXPOSE 8082
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar"]
