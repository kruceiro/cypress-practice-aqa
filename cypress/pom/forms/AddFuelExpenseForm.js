class AddFuelExpenseForm {

    get modalTitle() {
        return cy.contains('h4', 'Add an expense');
    }

    get modal() {
        return cy.get('app-add-expense-modal');
    }

    get vehicleDropdown() {
        return cy.get('#addExpenseCar');
    }

    get expenseDateInput() {
        return cy.get('#addExpenseDate');
    }

    get mileageInput() {
        return cy.get('#addExpenseMileage');
    }

    get litersInput() {
        return cy.get('#addExpenseLiters');
    }

    get totalCostInput() {
        return cy.get('#addExpenseTotalCost');
    }

    get buttonAdd() {
        return cy.get('app-add-expense-modal').contains('button', /^Add$/);
    }

    get buttonCancel() {
        return cy.contains('button', 'Cancel');
    }

    get buttonClose() {
        return cy.get('.close');
    }

    get mileageError() {
        return this.mileageInput
            .closest('.form-group')
            .find('.invalid-feedback');
    }

    get litersError() {
        return this.litersInput
            .closest('.form-group')
            .find('.invalid-feedback');
    }

    get totalCostError() {
        return this.totalCostInput
            .closest('.form-group')
            .find('.invalid-feedback');
    }

    get alert() {
        return cy.get('app-add-expense-modal .alert-danger');
    }

    fillMileage(mileage) {
        this.mileageInput.clear().type(mileage);
    }

    fillLiters(liters) {
        this.litersInput.type(liters);
    }

    fillTotalCost(totalCost) {
        this.totalCostInput.type(totalCost);
    }


    fillForm(mileage, liters, totalCost) {
        this.fillMileage(mileage);
        this.fillLiters(liters);
        this.fillTotalCost(totalCost);
    }

    clickAdd() {
        this.buttonAdd.click();
    }

    clickCancel() {
        this.buttonCancel.click();
    }

    clickClose() {
        this.buttonClose.click()
    }


}

export default new AddFuelExpenseForm;