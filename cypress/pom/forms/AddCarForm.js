class AddCarForm {

    get modalTitle() {
        return cy.contains('h4', 'Add a car');
    }

    get modal() {
        return cy.get('app-add-car-modal');
    }

    get brandDropdown() {
        return cy.get('#addCarBrand');
    }

    get modelDropdown() {
        return cy.get('#addCarModel');
    }

    get mileageInput() {
        return cy.get('#addCarMileage');
    }

    get buttonAdd() {
        return cy.get('app-add-car-modal').contains('button', /^Add$/);
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

    selectBrand(brand) {
        this.brandDropdown.select(brand);
    }

    selectModel(model) {
        this.modelDropdown.select(model);
    }

    fillMileage(mileage) {
        this.mileageInput.type(mileage);
    }

    clickAdd() {
        this.buttonAdd.click();
    }

    clickCancel() {
        this.buttonCancel.click();
    }

    clickClose() {
        this.buttonClose.click();
    }

    fillForm(brand, model, mileage) {
        this.selectBrand(brand);
        this.selectModel(model);
        this.fillMileage(mileage);
    }
}

export default new AddCarForm();