class RegistrationForm {

    get nameInput() {
        return cy.get('#signupName');
    }

    get lastNameInput() {
        return cy.get('#signupLastName');
    }

    get emailInput() {
        return cy.get('#signupEmail');
    }

    get passwordInput() {
        return cy.get('#signupPassword');
    }

    get repeatPasswordInput() {
        return cy.get('#signupRepeatPassword');
    }

    get registerButton() {
        return cy.contains('button', 'Register');
    }

    get modalHeader() {
        return cy.get('.modal-header');
    }
    fillName(name) {
        this.nameInput.type(name);
    }

    fillLastName(lastName) {
        this.lastNameInput.type(lastName);
    }

    fillEmail(email) {
        this.emailInput.type(email);
    }

    fillPassword(password) {
        this.passwordInput.type(password);
    }

    fillRepeatPassword(password) {
        this.repeatPasswordInput.type(password);
    }

    clickRegister() {
        this.registerButton.click();
    }

    fillForm(name, lastName, email, password, repeatPassword) {
        this.fillName(name);
        this.fillLastName(lastName);
        this.fillEmail(email);
        this.fillPassword(password);
        this.fillRepeatPassword(repeatPassword);
    }
}

export default new RegistrationForm();