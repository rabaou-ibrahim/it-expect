describe("Navigation Tests", () => {
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

  it("Home page from other pages", () => {
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
