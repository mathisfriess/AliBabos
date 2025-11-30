describe("Delete account", () => {
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

  it("should allow the user to delete his account", () => {
    cy.get('button[id="edit-profile-button"]').click();

    cy.intercept(`${keycloakOrigin}/**`).as("keycloak");

    cy.wait("@keycloak");
    cy.url().should("include", keycloakOrigin);

    cy.origin(keycloakOrigin, () => {
      cy.contains("button", "Delete account").should("be.visible").click();
      cy.get('button[id="delete-account-btn"]').click();
      cy.get('input[name="password"]').type("TestPassword123!");
      cy.get('input[id="kc-login"]').click();
      cy.get('input[type="submit"]').click();
      cy.contains("User deleted successfully").should("be.visible");
    });
  });
});
