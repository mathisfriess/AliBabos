describe("Register page with Keycloak", () => {
  const keycloakOrigin = Cypress.env("keycloak_origin");
  beforeEach(() => {
    cy.visit("/");
  });

  it("should allow a user to register via Keycloak", () => {
    cy.get('button[id="get-started-button"]').click();
    cy.url().should("include", keycloakOrigin);
    cy.origin(keycloakOrigin, () => {
      cy.contains("Register").click();
      cy.get('input[name="email"]').type("testuser@gmail.com");
      cy.get('input[name="password"]').type("TestPassword123!");
      cy.get('input[name="password-confirm"]').type("TestPassword123!");
      cy.get('input[name="firstName"]').type("Test");
      cy.get('input[name="lastName"]').type("User");
      cy.get('input[type="submit"]').click();
    });
    cy.url().should("include", "/profile");

    cy.contains("Test User").should("be.visible");
    cy.contains("testuser@gmail.com").should("be.visible");
  });

  it("should show validation errors for empty fields", () => {
    cy.get('button[id="get-started-button"]').click();
    cy.url().should("include", keycloakOrigin);

    cy.origin(keycloakOrigin, () => {
      cy.contains("Register").click();
      cy.get('input[type="submit"]').click();
      cy.contains("Please specify email.").should("be.visible");
      cy.contains("Please specify password.").should("be.visible");
      cy.contains("Please specify this field.").should("be.visible");
    });
  });
});
