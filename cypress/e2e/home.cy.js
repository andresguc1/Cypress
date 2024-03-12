describe("The Home page features should be works correctly", () => {
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

  it("The add remove elements works correctly", () => {
    cy.get("a").should("exist").contains("Add/Remove Elements").click();
    cy.get("h3").contains("Add/Remove Elements");

    cy.get("button").should("exist").contains("Add Element").click();
    cy.get("#elements > :nth-child(1)").should("be.visible");
    cy.get("button").should("exist").contains("Add Element").click();
    cy.get("#elements > :nth-child(2)").should("be.visible");
    cy.get("button").should("exist").contains("Add Element").click();
    cy.get("#elements > :nth-child(3)").should("be.visible");
    cy.get("#elements > :nth-child(1)").click();
    cy.get("#elements > :nth-child(1)").click();
    cy.get("#elements > :nth-child(1)").click();
  });

  it("The basic authentication login works is available and works correctly", () => {
    cy.visit("https://admin:admin@the-internet.herokuapp.com/basic_auth");
    cy.get("p").should("include.text", "Congratulations");
  });

  it("Should identify broken images", () => {
    // Select all images on the page
    cy.get("img").each(($img) => {
      // Get the image source
      const src = $img.attr("src");

      // Check if the image source is not empty
      if (src) {
        // Load the image URL
        cy.request({
          url: src,
          failOnStatusCode: false, // Do not fail the test for non-2xx or non-3xx status codes
        }).then((response) => {
          // Check if the response status is not 404 (Not Found)
          if (response.status !== 404) {
            expect(response.status).to.be.oneOf([200, 300]); // Expecting successful status codes
          }
        });
      } else {
        // If image source is empty, fail the test
        throw new Error("Image source is empty");
      }
    });
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

  it("Should locate Challenging DOM", () => {
    cy.get("a").should("exist").contains("Challenging DOM").click();
    cy.get("h3").contains("Challenging DOM");
    cy.get('.large-2.columns').find('a.button').eq(0).click()
    cy.get('div.large-10.columns canvas#canvas').invoke('attr', 'width').then((width) => {
      const canvasWidth = parseInt(width);
      // Now you can use the canvasWidth variable as needed in your test
      // For example, you can assert that the width is equal to a certain value
      expect(canvasWidth).to.equal(599);
    });
  });

  it("Should the checkbox could be selected", () => {
    cy.get("a").should("exist").contains("Checkboxes").click();
    cy.get("h3").contains("Checkboxes");
    cy.get('input[type="checkbox"]').eq('0').check();
    cy.get('input[type="checkbox"]').should('be.checked');
    cy.get('input[type="checkbox"]').eq('1').uncheck();
    cy.get('input[type="checkbox"]').eq('1').should('not.be.checked');
  });

  it.only("The Context Menu should be displayed", () => {
    cy.get("a").should("exist").contains("Context Menu").click();
    cy.get("h3").contains("Context Menu");
    cy.get('#hot-spot').should('is.visible').trigger('contextmenu'); // TODO: is not possible?
  });
});
