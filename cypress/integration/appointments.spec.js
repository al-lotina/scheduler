describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();
    cy.get("[name=name]") // or "[data-testid=student-name-input]"
      .type("Lydia Miller-Jones");
    cy.get("[class=interviewers__item]") // "[alt='Sylvia Palmer']" per compass, but the interviewer list is random in this server
      .first()
      .click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones"); // class selector, text to match 
  });

  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({force: true}); // since the element is hidden from view we need to force the action and disable "waiting for actionability".
    cy.get("[name=name]")
      .clear() 
      .type("Archie Cohen");
    cy.get("[class=interviewers__item]")
      .first()
      .click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Archie Cohen"); // class selector, text to match 
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .first()
      .click({force: true});
    cy.contains("Confirm").click();
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});