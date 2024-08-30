/// <reference types="cypress" />

describe("Password tests", () => {
  let datas = [
    {
      message: "Creating a new user without password",
      login: "monLogin1",
      firstname: "firstname1",
      lastname: "lastname1",
      password: "",
      subtitle: "Les champs doivent être remplis",
    },
    {
      message: "Creating a new user without uppercase",
      login: "monLogin1",
      firstname: "firstname1",
      lastname: "lastname1",
      password: "password1",
      subtitle: "Le mot de passe doit avoir une majuscule",
    },
    {
      message: "Creting a new user with password error casse",
      login: "monLogin2",
      firstname: "firstname2",
      lastname: "lastname2",
      password: "Passwor",
      subtitle: "Le mot de passe doit faire plus de 8 caractères",
    },
  ];
  datas.forEach((data) => {
    it(data.message, () => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit("http://localhost/it-expect/user/r");

      cy.get("#login") // Sélection par ID
        .type(data.login)
        .should("have.value", data.login);

      cy.get("#firstname") // Sélection par ID
        .type(data.firstname)
        .should("have.value", data.firstname);

      cy.get("#lastname") // Sélection par ID
        .type(data.lastname)
        .should("have.value", data.lastname);

      if (data.password) {
        cy.get("#password")
          .type(data.password)
          .should("have.value", data.password);
      } else {
        cy.get("#password").should("have.value", "");
      }

      cy.get(".submit").click();

      cy.get("#subtitle").should("contain", data.subtitle);
    });
  });
});
