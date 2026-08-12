class EditCarForm {

    get removeCarButton() {
        return cy.contains('button', 'Remove car');
    }

    clickRemoveCar() {
        this.removeCarButton.click();
    }
}

export default new EditCarForm();