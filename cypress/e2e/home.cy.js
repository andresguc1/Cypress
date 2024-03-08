describe("The Home page should be load correctly", () => {
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/");
  })


  it("the header display the correct tittles", () => {

    cy.get(".heading").should("exist").contains("Welcome to the-internet");
    cy.get("h2").should("exist").contains("Available Examples");
  });

  it("The A/B testing page are available", () => {

    cy.get("a").contains('A/B Testing').click();
    cy.get('h3').should('exist').contains('A/B Test Variation 1')
  });
});
