/// <reference types="cypress" />

import AddCarForm from "../../pom/forms/AddCarForm";
import LoginForm from "../../pom/forms/LoginForm";
import GaragePage from "../../pom/pages/GaragePage";
import HomePage from "../../pom/pages/HomePage";

describe('Add car and remove after', () => {
    let addedCars = [];


    context('Flow of adding a car', () => {

        beforeEach(() => {
            HomePage.visit();
            HomePage.openSignInForm();
            LoginForm.fillForm(
                Cypress.env('userEmail'),
                Cypress.env('userPassword')
            );
            LoginForm.clickLogin();
            cy.intercept('POST', '/api/cars').as('addCar');
        });

        after(() => {
            cy.log(addedCars);
            addedCars.forEach((id) => {
                cy.request({
                    method: 'DELETE',
                    url: `/api/cars/${id}`
                }).then((res) => {
                    expect(res.status).to.eq(200);
                    expect(res.body.data.carId).to.eq(id);
                });
            });
            GaragePage.visit();
        });

        it('Adds a car', () => {
            GaragePage.openAddCarForm();
            AddCarForm.modalTitle.should('contain.text', 'Add a car');
            AddCarForm.fillForm(
                'Audi',
                'TT',
                '5000'
            );
            AddCarForm.clickAdd();
            GaragePage.successfulCarAddedMessage.should('be.visible');
            GaragePage.carName.should(
                'contain.text',
                'Audi TT'
            );
            cy.wait('@addCar').then((interception) => {
                expect(interception.response.statusCode).to.eq(201);
                const carId = interception.response.body.data.id;
                addedCars.push(carId);
                cy.log(`Added car ID: ${carId}`);
            });
        });
    });
});