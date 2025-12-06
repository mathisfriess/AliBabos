// java
package com.alibabos.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

  @Bean
  public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
    return builder
        .routes()
        .route(
            "builder-service",
            r ->
                r.path("/builder/**")
                    .filters(f -> f.rewritePath("/builder/(?<segment>.*)", "/builder/${segment}"))
                    .uri("lb://builder-service"))
        .route(
            "image-service",
            r ->
                r.path("/images/**")
                    .filters(f -> f.rewritePath("/images/(?<segment>.*)", "/images/${segment}"))
                    .uri("lb://images-service"))
        .build();
  }
}
