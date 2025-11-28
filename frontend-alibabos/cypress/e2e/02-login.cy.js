describe("Login page with Keycloak", () => {
  const keycloakOrigin = Cypress.env("keycloak_origin");

  beforeEach(() => {
    cy.visit("/login");
  });

  it("should allow a user to login via Keycloak", () => {
    cy.origin(keycloakOrigin, () => {
      cy.get('input[name="username"]').type("testuser@gmail.com");
      cy.get('input[name="password"]').type("TestPassword123!");
      cy.get('button[type="submit"]').click();
    });

    cy.url().should("eq", Cypress.config().baseUrl + "/profile");

    cy.contains("Test User").should("be.visible");
    cy.contains("testuser@gmail.com").should("be.visible");
  });

  it("should show an error for invalid credentials", () => {
    cy.get("body").click("center");

    cy.origin(keycloakOrigin, () => {
      cy.get('input[name="username"]').type("wronguser");
      cy.get('input[name="password"]').type("wrongpass");
      cy.get('button[type="submit"]').click();

      cy.contains("Invalid username or password").should("be.visible");
    });
  });
});
