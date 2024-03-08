describe('The Home page should be load correctly', () => {
  it('the header display the correct messages', () => {
    cy.visit('https://the-internet.herokuapp.com/')
    cy.get(".heading").should("exist").contains("Welcome to the-internet")
    cy.get("h2").should("exist").contains("Available Examples")
  })
})