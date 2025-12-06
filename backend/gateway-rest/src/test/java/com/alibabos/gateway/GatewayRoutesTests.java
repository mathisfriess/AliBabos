package com.alibabos.gateway;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class GatewayRoutesTests {

  @Autowired private WebTestClient webTestClient;

  @Test
  void builderRouteIsConfigured() {
    webTestClient.get().uri("/builder/health").exchange().expectStatus().is4xxClientError();
  }
}
