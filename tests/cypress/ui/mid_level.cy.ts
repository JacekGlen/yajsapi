describe("Test Mid-level API", () => {
  it("should run mid-level api example", () => {
    cy.visit("/mid_level/command.html");
    cy.get("#YAGNA_APPKEY").clear().type(Cypress.env("YAGNA_APPKEY"));
    cy.get("#YAGNA_API_BASEPATH").clear().type(Cypress.env("YAGNA_API_BASEPATH"));
    cy.get("#SUBNET_TAG").clear().type(Cypress.env("YAGNA_SUBNET"));
    cy.get("#createPackage").click().debug();
    cy.get("#logs").contains("Package created");
    cy.get("#createAllocation").click();
    cy.get("#logs").contains(/Allocation .* has been created/);
    cy.get("#createDemand").click();
    cy.get("#logs").contains("Demand published on the market");
    cy.get("#logs").contains("New proposal has been received");
    cy.get("#respondProposal").click();
    cy.get("#logs").contains("New offer has been received");
    cy.get("#createAgreement").click();
    cy.get("#logs").contains(/Agreement .* created/);
    cy.get("#confirmAgreement").click();
    cy.get("#logs").contains(/Agreement .* approved/);
    cy.get("#createActivity").click();
    cy.get("#logs").contains(/Activity .* created/);
    cy.get("#COMMAND").clear().type("echo 'Hello Golem'");
    cy.wait(5000);
    cy.get("#execute").click();
    cy.get("#logs").contains("Script sent");
    cy.get("#results").contains("Hello Golem");
    cy.get("#end").click();
    cy.get("#logs").contains(/Activity .* destroyed/);
    cy.get("#logs").contains(/Agreement .* terminated/);
    cy.get("#logs").contains(/Allocation .* has been released/);
    cy.get("#logs").contains(/Demand .* unsubscribed/);
  });
});
