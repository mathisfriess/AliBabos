describe("Logout functionality with Keycloak", () => {
  const keycloakOrigin = Cypress.env("keycloak_origin");

  beforeEach(() => {
    cy.visit("/");
    cy.get('button[id="get-started-button"]').click();
    cy.url().should("include", keycloakOrigin);

    cy.origin(keycloakOrigin, () => {
      cy.get('input[name="username"]').type("testuser@gmail.com");
      cy.get('input[name="password"]').type("TestPassword123!");
      cy.get('input[name="login"]').click();
    });
    cy.url().should("eq", Cypress.config().baseUrl + "/profile");
  });

  it("should allow a logged-in user to logout", () => {
    cy.get('button[id="logout-button"]').click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
