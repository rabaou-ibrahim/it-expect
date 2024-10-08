describe("SignIn Tests", () => {
  let datas = [
    {
      message: "Connect user without PWD",
      login: "monLogin1",
      password: "",
      subtitle: "Les champs doivent être remplis",
    },
    {
      message: "Connect user without user Login",
      login: "",
      password: "password",
      subtitle: "Les champs doivent être remplis",
    },
    {
      message: "Connect user with wrong user Login",
      login: "Login2",
      password: "Passwor",
      subtitle: "Pseudo incorrect",
    },
    {
      message: "Connect user with wrong password",
      login: "Login9",
      password: "P@sswor",
      subtitle: "Mot de passe incorrect",
    },
  ];

  it("Load Home Page", () => {
    cy.visit("http://localhost/it-expect/home");
    cy.contains("Bonjour").should("be.visible");
  });

  it("Nav from home Page", () => {
    let btnSelectors = ["header a", "main a"];
    btnSelectors.forEach((btnSelector) => {
      cy.visit("http://localhost/it-expect/home");
      cy.get(btnSelector).contains("Connexion").click();
      cy.get("form > button").should("contain", "Se Connecter");
    });
  });
  //créer un user fictif pour les tests
  it("Create false user", () => {
    cy.visit("http://localhost/it-expect/user/r");
    cy.get("#login") // Sélection par ID
      .type("Login9");
    cy.get("#firstname") // Sélection par ID
      .type("Login9");
    cy.get("#lastname") // Sélection par ID
      .type("Login9");
    cy.get("#password").type("P@ssword");
    cy.get(".submit").click();
  });

  datas.forEach((data) => {
    it(data.message, () => {
      cy.visit("http://localhost/it-expect/user/l");
      if (data.login) {
        cy.get("#login").type(data.login).should("have.value", data.login);
      } else {
        cy.get("#login").should("have.value", "");
      }
      if (data.password) {
        cy.get("#password")
          .type(data.password)
          .should("have.value", data.password);
      } else {
        cy.get("#password").should("have.value", "");
      }
      cy.get("form button").contains("Se Connecter").click();
      cy.get("#subtitle").should("contain", data.subtitle);
    });
  });

  it("Connexion form success", () => {
    cy.visit("http://localhost/it-expect/user/l");
    cy.get("#login").type("Login9");
    cy.get("#password").type("P@ssword");
    cy.get("form button").contains("Se Connecter").click();
    cy.get("form").should("contain", "Ajouter projet");
  });

  it("Clear false User in DB", () => {
    cy.request({
      method: "GET",
      url: "http://localhost/it-expect/user/d/Login9",
    }).then((response) => {
      // Vérifications de la réponse
      expect(response.status).to.eq(200); // Vérifier que le statut HTTP est 200 (OK)
    });
  });
});
