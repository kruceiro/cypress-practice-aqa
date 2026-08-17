class RemoveCarForm {

    get removeButton() {
        return cy.contains('button', 'Remove');
    }

    clickRemove() {
        this.removeButton.click();
    }
}

export default new RemoveCarForm();