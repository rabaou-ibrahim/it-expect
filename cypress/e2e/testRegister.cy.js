/// <reference types="cypress" />

describe("Password tests & Subscription", () => {
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
    {
      message: "Creating a new user9",
      login: "monLogin9",
      firstname: "firstname8",
      lastname: "lastname8",
      password: "testTEST.",
      subtitle: "Inscription réussie !",
    },
    {
      message: "Creating a new user9",
      login: "monLogin9",
      firstname: "firstname8",
      lastname: "lastname8",
      password: "testTEST.",
      subtitle: "Pseudo déjà pris",
    },
    {
      message: "Creating user without login",
      login: "",
      firstname: "firstname8",
      lastname: "lastname8",
      password: "testTEST.",
      subtitle: "Les champs doivent être remplis",
    },
    {
      message: "Creating user without firstname",
      login: "monLogin10",
      firstname: "",
      lastname: "lastname8",
      password: "testTEST.",
      subtitle: "Les champs doivent être remplis",
    },
    {
      message: "Creating user without lastname",
      login: "monLogin11",
      firstname: "firstname8",
      lastname: "",
      password: "testTEST.",
      subtitle: "Les champs doivent être remplis",
    },
  ];
  datas.forEach((data) => {
    it(data.message, () => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test

      cy.visit("http://localhost/it-expect/user/r");
      if (data.login) {
        cy.get("#login") // Sélection par ID
          .type(data.login)
          .should("have.value", data.login);
      } else {
        cy.get("#login").should("have.value", "");
      }

      if (data.firstname) {
        cy.get("#firstname") // Sélection par ID
          .type(data.firstname)
          .should("have.value", data.firstname);
      } else {
        cy.get("#firstname").should("have.value", "");
      }

      if (data.lastname) {
      cy.get("#lastname") // Sélection par ID
        .type(data.lastname)
        .should("have.value", data.lastname);
      } else {
        cy.get("#lastname").should("have.value", "");
      }

      if (data.password) {
        cy.get("#password")
          .type(data.password)
          .should("have.value", data.password);
      } else {
        cy.get("#password").should("have.value", "");
      }

      cy.get(".submit").click();

      if (data.subtitle === "Inscription réussie !") {
        cy.url().should("include", "user/l");
      } else {
        cy.get("#subtitle").should("contain", data.subtitle);
      }
    });
  });

  it("should send a GET request with query parameters and verify response", () => {
    cy.request({
      method: "GET",
      url: "http://localhost/it-expect/user/d/monLogin9",
    }).then((response) => {
      // Vérifications de la réponse
      expect(response.status).to.eq(200); // Vérifier que le statut HTTP est 200 (OK)
    });
  });
});
