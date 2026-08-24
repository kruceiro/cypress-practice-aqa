/// <reference types="cypress" /> 

describe('Intercept user name', () => {
    before(() => {
        cy.request('POST', '/api/auth/signin', {
            'email': Cypress.env('userEmail'),
            'password': Cypress.env('userPassword'),
        }).then((res) => {
            expect(res.status).to.equal(200);
        });
    });

    it('Should display Polar Bear on Profile page', () => {
        cy.intercept('GET', '/api/users/profile', (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    status: 'ok',
                    data: {
                        userId: 3878573,
                        photoFilename: 'default-user.png',
                        name: 'Polar',
                        lastName: 'Bear',
                    },
                },
            });
        }).as('getProfile');
        cy.visit('/panel/profile');
        cy.wait('@getProfile').its('response.statusCode').should('eq', 200);
        cy.contains('Polar Bear').should('be.visible');
    });
});
