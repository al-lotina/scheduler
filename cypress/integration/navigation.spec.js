describe("Navigation", () => {
  // it("should visit root", () => {
  //   cy.visit("/");
  // });

  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.get('li')
      .contains('Tuesday') // targeting the h2 element inside of <li element
      .click();

    cy.contains("li", "Tuesday") // targets the <li element that contains "Tuesday"
      .should("have.css", "background-color", "rgb(242, 242, 242)");
    // or
    cy.contains("[data-testid=day]", "Tuesday") // uses CSS attribute as selector
      .should("have.class", "day-list__item--selected") // uses class as matcher
  });
  
});
