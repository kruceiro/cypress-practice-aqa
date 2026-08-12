class LoginForm {

    get emailInput() {
        return cy.get('#signinEmail');
    }

    get passwordInput() {
        return cy.get('#signinPassword');
    }

    get loginButton() {
        return cy.contains('button', 'Login');
    }

    get modalTitle() {
        return cy.get('h4');
    }

    fillEmail(email) {
        this.emailInput.type(email);
    }

    fillPassword(password) {
        this.passwordInput.type(password);
    }

    clickLogin() {
        this.loginButton.click();
    }

    fillForm(email, password) {
        this.fillEmail(email);
        this.fillPassword(password);
    }

}

export default new LoginForm()