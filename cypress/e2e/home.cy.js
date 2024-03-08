describe("The Home page should be load correctly", () => {
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/");
  });

  it("the header display the correct tittles", () => {
    cy.get(".heading").should("exist").contains("Welcome to the-internet");
    cy.get("h2").should("exist").contains("Available Examples");
  });

  it("The A/B testing page are available", () => {
    cy.get("a").should("exist").contains("A/B Testing").click({ force: true });
    cy.get("h3").contains("A/B Test");
  });

  it.only("The add remove elements works correctly", () => {
    cy.get("a").should("exist").contains("Add/Remove Elements").click();
    cy.get("h3").contains("Add/Remove Elements");

    cy.get("button").should("exist").contains("Add Element").click();
    cy.get('#elements > :nth-child(1)').should("be.visible")
    cy.get("button").should("exist").contains("Add Element").click();
    cy.get('#elements > :nth-child(2)').should("be.visible")
    cy.get("button").should("exist").contains("Add Element").click();
    cy.get('#elements > :nth-child(3)').should("be.visible")
    cy.get('#elements > :nth-child(1)').click()
    cy.get('#elements > :nth-child(1)').click()
    cy.get('#elements > :nth-child(1)').click()
  });

  it("The login form works is available and works correctly", () => {
    cy.get("a").should("exist").contains("Form Authentication").click();
    cy.get("h2").contains("Login Page");
    cy.get("#username").type("tomsmith");
    cy.get("#password").type("SuperSecretPassword!");
    cy.get("button").should("exist").contains("Login").click();
    cy.get("#flash-messages")
      .should("exist")
      .contains("You logged into a secure area!");
    cy.get("h2").contains("Secure Area");
  });
});
