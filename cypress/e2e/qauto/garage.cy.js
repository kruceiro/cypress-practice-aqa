/// <reference types="cypress" /> 

import AddFuelExpenseForm from "../../pom/forms/AddFuelExpenseForm";
import AddCarForm from "../../pom/forms/AddCarForm";
import LoginForm from "../../pom/forms/LoginForm";
import GaragePage from "../../pom/pages/GaragePage";
import HomePage from "../../pom/pages/HomePage";
import EditCarForm from "../../pom/forms/EditCarForm";
import RemoveCarForm from "../../pom/forms/RemoveCarForm";
import ExpensesPage from "../../pom/pages/ExpensesPage";

describe('Garage', () => {

    context('Log in to portal', () => {

        beforeEach(() => {
            HomePage.visit();
            HomePage.openSignInForm();
        });

        it('Opens login modal', () => {
            LoginForm.modalTitle.should('contain.text', 'Log in');
        });

        it('Logs in successfully', () => {
            LoginForm.fillForm(
                Cypress.env('userEmail'),
                Cypress.env('userPassword')
            );
            LoginForm.clickLogin();
            GaragePage.url.should('include', '/panel/garage');
            GaragePage.successfulLoginMessage.should('be.visible');
        });

    });

    context('Add car form', () => {

        beforeEach(() => {
            HomePage.visit();
            HomePage.openSignInForm();
            LoginForm.fillForm(Cypress.env('userEmail'), Cypress.env('userPassword'));
            LoginForm.clickLogin();
        });

        it('Opens Add car form', () => {
            GaragePage.openAddCarForm();
            AddCarForm.modalTitle.should('contain.text', 'Add a car');
        });

        it('Cancel button closes the modal', () => {
            GaragePage.openAddCarForm();
            AddCarForm.clickCancel();
            AddCarForm.modal.should('not.exist');
        });

        it('Close button closes the modal', () => {
            GaragePage.openAddCarForm();
            AddCarForm.clickClose();
            AddCarForm.modal.should('not.exist');
        });
    });

    context('Add car form validations', () => {

        beforeEach(() => {
            HomePage.visit();
            HomePage.openSignInForm();
            LoginForm.fillForm(Cypress.env('userEmail'), Cypress.env('userPassword'));
            LoginForm.clickLogin();
        });

        it('Add car button is disabled when mileage is empty', () => {
            GaragePage.openAddCarForm();
            AddCarForm.buttonAdd.should('be.disabled');
        });

        it('Error for negative Mileage', () => {
            GaragePage.openAddCarForm();
            AddCarForm.fillMileage('-100');
            AddCarForm.mileageInput.blur();
            AddCarForm.mileageInput.should('have.class', 'is-invalid');
            AddCarForm.mileageError.should('contain.text', 'Mileage has to be from 0 to 999999');
        });

        it('Error for Mileage greater than max limit', () => {
            GaragePage.openAddCarForm();
            AddCarForm.fillMileage('1000000');
            AddCarForm.mileageInput.blur();
            AddCarForm.mileageInput.should('have.class', 'is-invalid');
            AddCarForm.mileageError.should('contain.text', 'Mileage has to be from 0 to 999999');
        });

    });

    context('Flow of adding a car', () => {

        beforeEach(() => {
            HomePage.visit();
            HomePage.openSignInForm();
            LoginForm.fillForm(Cypress.env('userEmail'), Cypress.env('userPassword'));
            LoginForm.clickLogin();
        });

        afterEach(() => {
            GaragePage.openLastCreatedCarSettings();
            EditCarForm.clickRemoveCar();
            RemoveCarForm.clickRemove();
        });

        it('Adds a car', () => {
            GaragePage.openAddCarForm();
            AddCarForm.modalTitle.should('contain.text', 'Add a car');
            AddCarForm.fillForm('Audi', 'TT', '5000');
            AddCarForm.clickAdd();
            GaragePage.successfulCarAddedMessage.should('be.visible');
            GaragePage.carName.should('contain.text', 'Audi TT');
        });
    });

    context('Flow of adding fuel expense from Garage page', () => {

        beforeEach(() => {
            HomePage.visit();
            HomePage.openSignInForm();
            LoginForm.fillForm(
                Cypress.env('userEmail'),
                Cypress.env('userPassword')
            );
            LoginForm.clickLogin();
            GaragePage.openAddCarForm();
            AddCarForm.fillForm('Audi', 'TT', '1000');
            AddCarForm.clickAdd();
        });

        afterEach(() => {
            GaragePage.visit();
            GaragePage.openLastCreatedCarSettings();
            EditCarForm.clickRemoveCar();
            RemoveCarForm.clickRemove();
        });

        it('Add fuel expense button exists', () => {
            GaragePage.addFuelExpenseButton.should('be.visible');
        });

        it('Opens Add fuel expense form', () => {
            GaragePage.openAddFuelExpenseForm();
            AddFuelExpenseForm.modalTitle.should('contain.text', 'Add an expense');
        });

        it('Prefills vehicle and mileage in expense form', () => {
            GaragePage.openAddFuelExpenseForm();
            AddFuelExpenseForm.vehicleDropdown.find('option:selected').should('contain.text', 'Audi TT');
            AddFuelExpenseForm.mileageInput.should('have.value', '1000');
        });

        it('Adds fuel expense', () => {
            GaragePage.openAddFuelExpenseForm();
            AddFuelExpenseForm.vehicleDropdown.find('option:selected').should('contain.text', 'Audi TT');
            AddFuelExpenseForm.mileageInput.should('have.value', '1000');
            AddFuelExpenseForm.fillForm('1500', '50', '5000');
            AddFuelExpenseForm.mileageInput.should('have.value', '1500');
            AddFuelExpenseForm.clickAdd();
            ExpensesPage.url.should('include', '/panel/expenses');
            ExpensesPage.successfulExpenseAddedMessage.should('be.visible');
            ExpensesPage.expenseMileage.should('contain.text', '1500');
            ExpensesPage.expenseLiters.should('contain.text', '50L');
            ExpensesPage.expenseTotalCost.should('contain.text', '5000.00 USD');

        });
    });

    context('Add an expense form', () => {
        beforeEach(() => {
            HomePage.visit();
            HomePage.openSignInForm();
            LoginForm.fillForm(
                Cypress.env('userEmail'),
                Cypress.env('userPassword')
            );
            LoginForm.clickLogin();
            GaragePage.openAddCarForm();
            AddCarForm.fillForm('Audi', 'TT', '1000');
            AddCarForm.clickAdd();
        });

        afterEach(() => {
            GaragePage.visit();
            GaragePage.openLastCreatedCarSettings();
            EditCarForm.clickRemoveCar();
            RemoveCarForm.clickRemove();
        });

        it('Opens Add an expense form', () => {
            GaragePage.openAddFuelExpenseForm();
            AddFuelExpenseForm.modalTitle.should('contain.text', 'Add an expense');
        });

        it('Cancel button closes the modal', () => {
            GaragePage.openAddFuelExpenseForm();
            AddFuelExpenseForm.clickCancel();
            AddFuelExpenseForm.modal.should('not.exist');
        });

        it('Close button closes the modal', () => {
            GaragePage.openAddFuelExpenseForm();
            AddFuelExpenseForm.clickClose();
            AddFuelExpenseForm.modal.should('not.exist');
        });

    });

    context('Add fuel expense form validation', () => {

        beforeEach(() => {
            HomePage.visit();
            HomePage.openSignInForm();
            LoginForm.fillForm(
                Cypress.env('userEmail'),
                Cypress.env('userPassword')
            );
            LoginForm.clickLogin();
            GaragePage.openAddCarForm();
            AddCarForm.fillForm('Audi', 'TT', '1000');
            AddCarForm.clickAdd();
        });

        afterEach(() => {
            GaragePage.visit();
            GaragePage.openLastCreatedCarSettings();
            EditCarForm.clickRemoveCar();
            RemoveCarForm.clickRemove();
        });

        it('Add button is disabled when required fields are empty', () => {
            GaragePage.openAddFuelExpenseForm();
            AddFuelExpenseForm.buttonAdd.should('be.disabled');
        });

        it('Error for negative Number of liters', () => {
            GaragePage.openAddFuelExpenseForm();
            AddFuelExpenseForm.fillLiters('-100');
            AddFuelExpenseForm.litersInput.blur();
            AddFuelExpenseForm.litersInput.should('have.class', 'is-invalid');
            AddFuelExpenseForm.litersError.should('contain.text', 'Liters has to be from 0.01 to 9999');
        });

        it('Error for Number of liters equals 0', () => {
            GaragePage.openAddFuelExpenseForm();
            AddFuelExpenseForm.fillLiters('0');
            AddFuelExpenseForm.litersInput.blur();
            AddFuelExpenseForm.litersInput.should('have.class', 'is-invalid');
            AddFuelExpenseForm.litersError.should('contain.text', 'Liters has to be from 0.01 to 9999');
        });

        it('Error for Number of liters greater than max limit', () => {
            GaragePage.openAddFuelExpenseForm();
            AddFuelExpenseForm.fillLiters('1000000');
            AddFuelExpenseForm.litersInput.blur();
            AddFuelExpenseForm.litersInput.should('have.class', 'is-invalid');
            AddFuelExpenseForm.litersError.should('contain.text', 'Liters has to be from 0.01 to 9999');
        });

        it('Error for negative Total cost', () => {
            GaragePage.openAddFuelExpenseForm();
            AddFuelExpenseForm.fillTotalCost('-100');
            AddFuelExpenseForm.totalCostInput.blur();
            AddFuelExpenseForm.totalCostInput.should('have.class', 'is-invalid');
            AddFuelExpenseForm.totalCostError.should('contain.text', 'Total cost has to be from 0.01 to 1000000');
        });

        it('Error for Total cost equals 0', () => {
            GaragePage.openAddFuelExpenseForm();
            AddFuelExpenseForm.fillTotalCost('0');
            AddFuelExpenseForm.totalCostInput.blur();
            AddFuelExpenseForm.totalCostInput.should('have.class', 'is-invalid');
            AddFuelExpenseForm.totalCostError.should('contain.text', 'Total cost has to be from 0.01 to 1000000');
        });

        it('Error for Total cost greater than max limit', () => {
            GaragePage.openAddFuelExpenseForm();
            AddFuelExpenseForm.fillTotalCost('10000000');
            AddFuelExpenseForm.totalCostInput.blur();
            AddFuelExpenseForm.totalCostInput.should('have.class', 'is-invalid');
            AddFuelExpenseForm.totalCostError.should('contain.text', 'Total cost has to be from 0.01 to 1000000');
        });

        it('Error when first expense mileage equals car initial mileage', () => {
            GaragePage.openAddFuelExpenseForm();
            AddFuelExpenseForm.fillMileage('1000');
            AddFuelExpenseForm.fillLiters('5');
            AddFuelExpenseForm.fillTotalCost('5000');
            AddFuelExpenseForm.clickAdd();
            AddFuelExpenseForm.alert.should('be.visible').and(
                'contain.text', 'First expense mileage must not be less or equal to car initial mileage');
        });

        it('Error when first expense mileage is less than car initial mileage', () => {
            GaragePage.openAddFuelExpenseForm();
            AddFuelExpenseForm.fillMileage('999');
            AddFuelExpenseForm.fillLiters('5');
            AddFuelExpenseForm.fillTotalCost('5000');
            AddFuelExpenseForm.clickAdd();
            AddFuelExpenseForm.alert.should('be.visible').and(
                'contain.text', 'First expense mileage must not be less or equal to car initial mileage'
            );
        });
    });
});