// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "shouldContainText",
  { prevSubject: true },
  (subject, expectedText) => {
    expect(subject).to.contain.text(expectedText);
  }
);

Cypress.Commands.add(  "shouldHaveText",  { prevSubject: true }, (subject, expectedText) => {
    expect(subject).to.have.text(expectedText);
  }
);

Cypress.Commands.add("shouldBeVisible", { prevSubject: true }, (subject) => {
  cy.wrap(subject).should("be.visible");
});

Cypress.Commands.add("shouldNotBeVisible", { prevSubject: true }, (subject) => {
  cy.wrap(subject).should("not.be.visible");
});

Cypress.Commands.add("waitForLoader", () => {
  cy.get(".loader", { timeout: 90000 }).should("not.exist");
});

Cypress.Commands.add("visitMaaxUSA", (url = "") => {
  cy.visit("https://maax.com/" + url);
});
Cypress.Commands.add("textSearch", (text = "") => {
  cy.visit("https://maax.com/search?query=" + text);
});

Cypress.Commands.add("visitMaaxCA", (url = "") => {
  cy.visit("https://maax.ca/" + url);
  mainPage.acceptAllCookiesButton.click();
});
