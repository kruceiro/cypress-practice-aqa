/// <reference types="cypress" /> 

import AddFuelExpenseForm from "../../pom/forms/AddFuelExpenseForm";
import AddCarForm from "../../pom/forms/AddCarForm";
import LoginForm from "../../pom/forms/LoginForm";
import GaragePage from "../../pom/pages/GaragePage";
import HomePage from "../../pom/pages/HomePage";
import EditCarForm from "../../pom/forms/EditCarForm";
import RemoveCarForm from "../../pom/forms/RemoveCarForm";
import ExpensesPage from "../../pom/pages/ExpensesPage";

describe('Fuel expenses', () => {

    context('Add fuel expense from Expenses page', () => {

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
            ExpensesPage.visit();
        });

        afterEach(() => {
            GaragePage.visit();
            GaragePage.openLastCreatedCarSettings();
            EditCarForm.clickRemoveCar();
            RemoveCarForm.clickRemove();
        });

        it('Add an expense button exists', () => {
            ExpensesPage.addExpenseButton.should('be.visible');
        });

        it('Opens Add an expense form', () => {
            ExpensesPage.openAddExpenseForm();
            AddFuelExpenseForm.modalTitle.should('contain.text', 'Add an expense');
        });

        it('Prefills vehicle and mileage in expense form', () => {
            ExpensesPage.openAddExpenseForm();
            AddFuelExpenseForm.vehicleDropdown.find('option:selected').should('contain.text', 'Audi TT');
            AddFuelExpenseForm.mileageInput.should('have.value', '1000');
        });

        it('Adds fuel expense', () => {
            ExpensesPage.openAddExpenseForm();
            AddFuelExpenseForm.fillForm('1500', '50', '5000');
            AddFuelExpenseForm.clickAdd();
            ExpensesPage.successfulExpenseAddedMessage.should('be.visible');
            ExpensesPage.expenseMileage.should('contain.text', '1500');
            ExpensesPage.expenseLiters.should('contain.text', '50L');
            ExpensesPage.expenseTotalCost.should('contain.text', '5000.00 USD');
        });

    });

});