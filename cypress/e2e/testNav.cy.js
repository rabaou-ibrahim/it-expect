describe("Navigation Tests Hors connexion", () => {
  it("Load Home Page", () => {
    cy.visit("http://localhost/it-expect/home");
    cy.contains("Bonjour").should("be.visible");
  });

  it("Nav to connexion", () => {
    let btnSelectors = ["header a", "main a"];
    btnSelectors.forEach((btnSelector) => {
      cy.visit("http://localhost/it-expect/home");
      cy.get(btnSelector).contains("Connexion").click();
      cy.get("form > button").should("contain", "Se Connecter");
    });
  });
  it("Nav to register", () => {
    let btnSelectors = ["header a", "main a"];
    btnSelectors.forEach((btnSelector) => {
      cy.visit("http://localhost/it-expect/home");
      cy.get(btnSelector).contains("Inscription").click();
      cy.get("form > button").should("contain", "S'inscrire");
    });
  });

  it("Home page from other pages, user not logged", () => {
    let fromPages = [
      "http://localhost/it-expect/home",
      "http://localhost/it-expect/user/l",
      "http://localhost/it-expect/user/r",
    ];
    let homeLinks = ["Super reminder", "Accueil"];

    fromPages.forEach((page) => {
      homeLinks.forEach((homeLink) => {
        cy.visit(page);
        cy.get("header a").contains(homeLink).click();
        cy.contains("Bonjour").should("be.visible");
      });
    });
  });
});

describe("Navigation Tests avec Logged User", () => {
  it("Load Home Page", () => {
    cy.visit("http://localhost/it-expect/home");
    cy.contains("Bonjour").should("be.visible");
  });
  it("Create false user and connect", () => {
    cy.visit("http://localhost/it-expect/user/r");
    cy.get("#login").type("Login9");
    cy.get("#firstname").type("Login9");
    cy.get("#lastname").type("Login9");
    cy.get("#password").type("P@ssword");
    cy.get(".submit").click();
    cy.url().should("contain", "it-expect/user/l");
    cy.visit("http://localhost/it-expect/user/l");
    cy.get("#login").type("Login9");
    cy.get("#password").type("P@ssword");
    cy.get("form button").contains("Se Connecter").click();
    cy.url().should("contain", "it-expect/user/p");
  });

  // créer un projet
  it("création d'un projet", () => {
    cy.visit("http://localhost/it-expect/user/l");
    cy.get("#login").type("Login9");
    cy.get("#password").type("P@ssword");
    cy.get("form button").contains("Se Connecter").click();
    cy.get("#title").type("it-project");
    cy.get("#description").type("mon projet");
    cy.get("button").contains("Ajouter").click();
    cy.get("table td").should("contain", "it-project");
    cy.get("table td").should("contain", "mon projet");
    cy.get("td")
      .contains("it-project")
      .parent()
      .find("button") // Trouver le bouton Supprimer
      .click();
    // cy.get("table td").should('not', 'it-project');
  });

  //faire les tests de navigation d'un user une fois connecté
  it("Home page from project pages, user logged", () => {
    cy.visit("http://localhost/it-expect/user/l");
    cy.get("#login").type("Login9");
    cy.get("#password").type("P@ssword");
    cy.get("form button").contains("Se Connecter").click();
    let fromPages = [
      "http://localhost/it-expect/home",
      "http://localhost/it-expect/user/l",
      "http://localhost/it-expect/user/r",
      "http://localhost/it-expect/user/p",
      "http://localhost/it-expect/project/d",
    ];
    let homeLinks = ["Super reminder", "Accueil"];

    fromPages.forEach((page) => {
      homeLinks.forEach((homeLink) => {
        cy.visit(page);
        cy.get("header a").contains(homeLink).click();
        cy.contains("Bonjour Login9").should("be.visible");
      });
    });
  });

  it("Deconnect", () => {
    cy.visit("http://localhost/it-expect/user/l");
    cy.get("#login").type("Login9");
    cy.get("#password").type("P@ssword");
    cy.get("form button").contains("Se Connecter").click();
    cy.get("header a").contains("Déconnexion").click();
    cy.url().should("contain", "it-expect/home");
    cy.get("article h2").should("contain", "invité");
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
