/// <reference types="cypress" />

describe('Homepage practice', () => {
    context('search element', () => {
        beforeEach(() => {
            cy.visit('/');
        });

        it('cy.get', () => {
            cy.get('h1');
        });

        it('cy.children', () => {
            cy.get('.footer').children('div');
        });

        it('cy.contains', () => {
            cy.get('header').contains('Home');
        });

        it('cy.closest', () => {
            cy.get('header button').first().closest('header');
        });

        it('cy.first', () => {
            cy.get('header a').first();
        });

        it('cy.last', () => {
            cy.get('.about-block').last();
        });

        it('cy.eq', () => {
            cy.get('.about-block_descr.lead').eq(1);
        });
    });

    context('element actions', () => {
        beforeEach(() => {
            cy.visit('/');
        });

        it('cy.alias+click', () => {
            cy.get('.btn-primary').as('signUpButton');
            cy.get('@signUpButton').click();
            cy.get('.modal-header').should('contain.text', 'Registration');
        });

        it('cy.alias+type+clear', () => {
            cy.get('.btn-primary').click();
            cy.get('.modal-content');
            cy.get('#signupName').as('userNameInput');
            cy.get('@userNameInput').type('Marko Polo');
            cy.get('@userNameInput').should('have.value', 'Marko Polo');
            cy.get('@userNameInput').clear();
            cy.get('button.close').click();
        });
    });
});