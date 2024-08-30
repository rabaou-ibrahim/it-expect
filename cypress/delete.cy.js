/// <reference types="cypress" />

describe('GET request to verify user', () => {
    it('should send a GET request with query parameters and verify response', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost/it-expect/user/d', // URL de l'endpoint
        qs: {
          login: 'monlogin9'  // Paramètre de requête (login)
        }
      }).then((response) => {
        // Vérifications de la réponse
        expect(response.status).to.eq(200);  // Vérifier que le statut HTTP est 200 (OK)
      });
    });
  });
  
