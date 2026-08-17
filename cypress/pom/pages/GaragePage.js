class GaragePage {

    get url() {
        return cy.url();
    }

    get successfulSignUpMessage() {
        return cy.contains('.alert-success', 'Registration complete').should('be.visible');
    }

    get successfulLoginMessage() {
        return cy.contains('div p', 'You have been successfully logged in');
    }

    get successfulCarAddedMessage() {
        return cy.contains('.alert-success', 'Car added');
    }

    get successfulCarRemovedMessage() {
        return cy.contains('.alert-success', 'Car removed');
    }

    get addCarButton() {
        return cy.contains('button', 'Add car');
    }

    get carName() {
        return cy.contains('p', 'Audi TT');
    }

    get addFuelExpenseButton() {
        return cy.contains('button', 'Add fuel expense');
    }

    get carCards() {
        return cy.get('app-car');
    }

    get lastCreatedCar() {
        return this.carCards.first();
    }

    get addFuelExpenseButton() {
        return this.lastCreatedCar
            .find('.car_add-expense');
    }

    get editLastCreatedCarButton() {
        return this.lastCreatedCar.find('.car_edit');
    }

    openAddCarForm() {
        this.addCarButton.click();
    }

    openAddFuelExpenseForm() {
        this.addFuelExpenseButton.click();
    }

    openLastCreatedCarSettings() {
        this.editLastCreatedCarButton.click();
    }

    openLastCreatedCarSettings() {
        this.editLastCreatedCarButton.click();
    }

    visit() {
        cy.visit('/panel/garage');
    }


}

export default new GaragePage();