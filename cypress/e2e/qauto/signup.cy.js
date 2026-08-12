/// <reference types="cypress" /> 

import HomePage from "../../pom/pages/HomePage";
import RegistrationForm from '../../pom/forms/RegistrationForm';
import GaragePage from "../../pom/pages/GaragePage";

describe('Registration', () => {
    beforeEach(() => {
        HomePage.visit();
        HomePage.openSignUpForm();
    });
    context('Registration modal', () => {
        it('Validate Registration title text', () => {
            RegistrationForm.modalHeader.should('contain.text', 'Registration');
        });
    });

    context('Name field validation', () => {

        it('valid name', () => {
            RegistrationForm
                .fillName('Frank');
            RegistrationForm
                .nameInput.blur();
            RegistrationForm
                .nameInput.should('have.value', 'Frank');
            RegistrationForm
                .nameInput.should('not.have.class', 'is-invalid');
        });

        it('valid name with 2 symbols', () => {
            RegistrationForm
                .fillName('Fr');
            RegistrationForm
                .nameInput.blur();
            RegistrationForm
                .nameInput.should('have.value', 'Fr');
            RegistrationForm
                .nameInput.should('not.have.class', 'is-invalid');
        });

        it('valid name with 20 symbols', () => {
            RegistrationForm
                .fillName('VeryLongNameTypeHere');
            RegistrationForm
                .nameInput.blur();
            RegistrationForm
                .nameInput.should('have.value', 'VeryLongNameTypeHere');
            RegistrationForm
                .nameInput.should('not.have.class', 'is-invalid');
        });

        // Тест падає бо фактичний текст помилки 'Name required')
        it('error for empty name', () => {
            RegistrationForm
                .nameInput.click();
            RegistrationForm
                .nameInput.blur();
            RegistrationForm
                .nameInput.siblings('.invalid-feedback').should('contain.text', 'Name is required');
        });

        it('error for invalid name -> not EN symbol', () => {
            RegistrationForm
                .fillName('привіт');
            RegistrationForm
                .nameInput.blur();
            RegistrationForm
                .nameInput.siblings('.invalid-feedback').should('contain.text', 'Name is invalid');
        })

        it('error when name is shorter than 2 characters', () => {
            RegistrationForm
                .fillName('A');
            RegistrationForm
                .nameInput.blur();
            RegistrationForm
                .nameInput.siblings('.invalid-feedback').should('contain.text', 'Name has to be from 2 to 20 characters long');
        });

        it('error when name is longer than 20 characters', () => {
            RegistrationForm
                .fillName('VeryLongNameIsWrittenHere');
            RegistrationForm
                .nameInput.blur();
            RegistrationForm
                .nameInput.siblings('.invalid-feedback').should('contain.text', 'Name has to be from 2 to 20 characters long');
        });

        // Падає через вимоги
        it('name trims trailing spaces', () => {
            RegistrationForm
                .fillName('Frank      ');
            RegistrationForm
                .nameInput.blur();
            RegistrationForm
                .nameInput.should('have.value', 'Frank');
        });
        // Падає через вимоги
        it('name trims leading spaces', () => {
            RegistrationForm
                .fillName('      Frank');
            RegistrationForm
                .nameInput.blur();
            RegistrationForm
                .nameInput.should('have.value', 'Frank');
        });
        // Падає через вимоги
        it('name trims leading and trailing spaces', () => {
            RegistrationForm
                .fillName('    Frank    ');
            RegistrationForm
                .nameInput.blur();
            RegistrationForm
                .nameInput.should('have.value', 'Frank');
        });
        // Падає через вимоги
        it('name trims spaces-only input', () => {
            RegistrationForm
                .fillName('      ');
            RegistrationForm
                .nameInput.blur();
            RegistrationForm
                .nameInput.siblings('.invalid-feedback').should('contain.text', 'Name is required');
        });

        it('invalid name border color is red', () => {
            RegistrationForm
                .nameInput.click();
            RegistrationForm
                .nameInput.blur();
            RegistrationForm
                .nameInput.should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    context('Last name field validation', () => {

        it('valid last name', () => {
            RegistrationForm
                .fillLastName('Garfield');
            RegistrationForm
                .lastNameInput.blur();
            RegistrationForm
                .lastNameInput.should('have.value', 'Garfield');
            RegistrationForm
                .lastNameInput.should('not.have.class', 'is-invalid');
        });

        it('valid last name with 2 symbols', () => {
            RegistrationForm
                .fillLastName('Ga');
            RegistrationForm
                .lastNameInput.blur();
            RegistrationForm
                .lastNameInput.should('have.value', 'Ga');
            RegistrationForm
                .lastNameInput.should('not.have.class', 'is-invalid');
        });

        it('valid last name with 20 symbols', () => {
            RegistrationForm
                .fillLastName('VeryLongLastNameHere');
            RegistrationForm
                .lastNameInput.blur();
            RegistrationForm
                .lastNameInput.should('have.value', 'VeryLongLastNameHere');
            RegistrationForm
                .lastNameInput.should('not.have.class', 'is-invalid');
        });

        // Тест падає бо фактичний текст помилки 'Last name required')
        it('error for empty last name', () => {
            RegistrationForm
                .lastNameInput.click();
            RegistrationForm
                .lastNameInput.blur();
            RegistrationForm
                .lastNameInput.siblings('.invalid-feedback').should('contain.text', 'Last name is required');
        });

        it('error for invalid last name -> not EN symbol', () => {
            RegistrationForm
                .fillLastName('привіт');
            RegistrationForm
                .lastNameInput.blur();
            RegistrationForm
                .lastNameInput.siblings('.invalid-feedback').should('contain.text', 'Last name is invalid');
        });

        it('error when last name is less than 2 characters', () => {
            RegistrationForm
                .fillLastName('A');
            RegistrationForm
                .lastNameInput.blur();
            RegistrationForm
                .lastNameInput.siblings('.invalid-feedback').should('contain.text', 'Last name has to be from 2 to 20 characters long');
        });

        it('error when last name is more than 20 characters', () => {
            RegistrationForm
                .fillLastName('VeryLongNameIsWrittenHere');
            RegistrationForm
                .lastNameInput.blur();
            RegistrationForm
                .lastNameInput.siblings('.invalid-feedback').should('contain.text', 'Last name has to be from 2 to 20 characters long');
        });

        // Падає через вимоги
        it('last name trims trailing spaces', () => {
            RegistrationForm
                .fillLastName('Garfield  ');
            RegistrationForm
                .lastNameInput.blur();
            RegistrationForm
                .lastNameInput.should('have.value', 'Garfield');
        });
        // Падає через вимоги
        it('last name trims leading spaces', () => {
            RegistrationForm
                .fillLastName('  Garfield');
            RegistrationForm
                .lastNameInput.blur();
            RegistrationForm
                .lastNameInput.should('have.value', 'Garfield');
        });
        // Падає через вимоги
        it('last name trims leading and trailing spaces', () => {
            RegistrationForm
                .fillLastName(' Garfield ');
            RegistrationForm
                .lastNameInput.blur();
            RegistrationForm
                .lastNameInput.should('have.value', 'Garfield');
        });
        // Падає через вимоги
        it('last name trims spaces-only input', () => {
            RegistrationForm
                .fillLastName('      ');
            RegistrationForm
                .lastNameInput.blur();
            RegistrationForm
                .lastNameInput.siblings('.invalid-feedback').should('contain.text', 'Last name is required');
        });

        it('invalid last name border color is red', () => {
            RegistrationForm
                .lastNameInput.click();
            RegistrationForm
                .lastNameInput.blur();
            RegistrationForm
                .lastNameInput.should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    context('Email field validation', () => {

        it('valid email - 1', () => {
            RegistrationForm
                .fillEmail('frank.garfield@gmail.com');
            RegistrationForm
                .emailInput.blur();
            RegistrationForm
                .emailInput
                .should('have.value', 'frank.garfield@gmail.com');
            RegistrationForm
                .emailInput
                .should('not.have.class', 'is-invalid');
        });

        it('valid email - 2', () => {
            RegistrationForm
                .fillEmail('12345@gmail.com');
            RegistrationForm
                .emailInput
                .blur();
            RegistrationForm
                .emailInput
                .should('have.value', '12345@gmail.com');
            RegistrationForm
                .emailInput
                .should('not.have.class', 'is-invalid');
        });

        it('valid email - 3', () => {
            RegistrationForm
                .fillEmail('frank_-_!#12345@gmail.com');
            RegistrationForm
                .emailInput
                .blur();
            RegistrationForm
                .emailInput
                .should('have.value', 'frank_-_!#12345@gmail.com');
            RegistrationForm
                .emailInput
                .should('not.have.class', 'is-invalid');
        });

        it('error for empty email', () => {
            RegistrationForm
                .emailInput
                .click();
            RegistrationForm
                .emailInput
                .blur();
            RegistrationForm
                .emailInput
                .siblings('.invalid-feedback').should('contain.text', 'Email required');
        });

        it('error for invalid email 1', () => {
            RegistrationForm
                .fillEmail('abc');
            RegistrationForm
                .emailInput
                .blur();
            RegistrationForm
                .emailInput
                .siblings('.invalid-feedback').should('contain.text', 'Email is incorrect');
        });

        it('error for invalid email 2', () => {
            RegistrationForm
                .fillEmail('abc@gmail');
            RegistrationForm
                .emailInput
                .blur();
            RegistrationForm
                .emailInput
                .siblings('.invalid-feedback').should('contain.text', 'Email is incorrect');
        });

        it('invalid email border color is red', () => {
            RegistrationForm
                .emailInput
                .click();
            RegistrationForm
                .emailInput
                .blur();
            RegistrationForm
                .emailInput
                .should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    context('Password field validation', () => {

        it('valid password', () => {
            RegistrationForm
                .fillPassword('Password1');
            RegistrationForm
                .passwordInput.blur();
            RegistrationForm
                .passwordInput.should('have.value', 'Password1');
            RegistrationForm
                .passwordInput.should('not.have.class', 'is-invalid');
        });

        it('valid password with special symbol', () => {
            RegistrationForm
                .fillPassword('Password1@');
            RegistrationForm
                .passwordInput.blur();
            RegistrationForm
                .passwordInput.should('have.value', 'Password1@');
            RegistrationForm
                .passwordInput.should('not.have.class', 'is-invalid');
        });

        it('valid password with 8 characters', () => {
            RegistrationForm
                .fillPassword('Passwor1');
            RegistrationForm
                .passwordInput.blur();
            RegistrationForm
                .passwordInput.should('have.value', 'Passwor1');
            RegistrationForm
                .passwordInput.should('not.have.class', 'is-invalid');
        });

        it('valid password with 15 characters', () => {
            RegistrationForm
                .fillPassword('Password123Abcd');
            RegistrationForm
                .passwordInput.blur();
            RegistrationForm
                .passwordInput.should('have.value', 'Password123Abcd');
            RegistrationForm
                .passwordInput.should('not.have.class', 'is-invalid');
        });

        it('error for empty password', () => {
            RegistrationForm
                .passwordInput.click();
            RegistrationForm
                .passwordInput.blur();
            RegistrationForm
                .passwordInput.siblings('.invalid-feedback').should('contain.text', 'Password required')
        });

        it('error when password is less than 8 characters', () => {
            RegistrationForm
                .fillPassword('Pass1');
            RegistrationForm
                .passwordInput.blur();
            RegistrationForm
                .passwordInput.siblings('.invalid-feedback')
                .should('contain.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        it('error when password is more than 15 characters', () => {
            RegistrationForm
                .fillPassword('Password123AbcdX');
            RegistrationForm
                .passwordInput.blur();
            RegistrationForm
                .passwordInput.siblings('.invalid-feedback')
                .should('contain.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        it('error when password without digit', () => {
            RegistrationForm
                .fillPassword('Password');
            RegistrationForm
                .passwordInput.blur();
            RegistrationForm
                .passwordInput.siblings('.invalid-feedback')
                .should('contain.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        it('error when password without uppercase letter', () => {
            RegistrationForm
                .fillPassword('password1');
            RegistrationForm
                .passwordInput.blur();
            RegistrationForm
                .passwordInput.siblings('.invalid-feedback')
                .should('contain.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        it('error when password without lowercase letter', () => {
            RegistrationForm
                .fillPassword('PASSWORD1');
            RegistrationForm
                .passwordInput.blur();
            RegistrationForm
                .passwordInput.siblings('.invalid-feedback')
                .should('contain.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        it('error when password with integers only', () => {
            RegistrationForm
                .fillPassword('12345678');
            RegistrationForm
                .passwordInput.blur();
            RegistrationForm
                .passwordInput.siblings('.invalid-feedback')
                .should('contain.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        it('error when password with specials symbols only', () => {
            RegistrationForm
                .fillPassword('!@#$%^&*');
            RegistrationForm
                .passwordInput.blur();
            RegistrationForm
                .passwordInput.siblings('.invalid-feedback')
                .should('contain.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        it('invalid password border color is red', () => {
            RegistrationForm
                .passwordInput.click();
            RegistrationForm
                .passwordInput.blur();
            RegistrationForm
                .passwordInput.should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    context('Re-enter password field validation', () => {

        it('valid re-enter password', () => {
            RegistrationForm
                .fillPassword('Password1');
            RegistrationForm
                .fillRepeatPassword('Password1');
            RegistrationForm
                .repeatPasswordInput.blur();
            RegistrationForm
                .repeatPasswordInput.should('have.value', 'Password1');
            RegistrationForm
                .repeatPasswordInput.should('not.have.class', 'is-invalid');
        });

        it('error for empty re-enter password', () => {
            RegistrationForm
                .fillPassword('Password1');
            RegistrationForm
                .repeatPasswordInput.focus();
            RegistrationForm
                .repeatPasswordInput.blur();
            RegistrationForm
                .repeatPasswordInput.siblings('.invalid-feedback').should('contain.text', 'Re-enter password required');
        });

        it('error when passwords do not match', () => {
            RegistrationForm
                .fillPassword('Password1');
            RegistrationForm
                .fillRepeatPassword('Password2');
            RegistrationForm
                .repeatPasswordInput.blur();
            RegistrationForm
                .repeatPasswordInput.siblings('.invalid-feedback').should('contain.text', 'Passwords do not match');
        });

        it('invalid re-enter password border color is red', () => {
            RegistrationForm
                .fillPassword('Password1');
            RegistrationForm
                .fillRepeatPassword('Password2');
            RegistrationForm
                .repeatPasswordInput.blur();
            RegistrationForm
                .repeatPasswordInput.should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    context('Register button', () => {

        it('registers a new user with valid data', () => {
            const email = `yevhenii.krutsiak+${Date.now()}@gmail.com`;
            cy.log(`Generated email: ${email}`);
            RegistrationForm.fillForm(
                'Erling',
                'Haaland',
                email,
                'Password1',
                'Password1'
            );
            RegistrationForm.registerButton.should('be.enabled').click();
            GaragePage.getGaragePageURL.should('include', '/panel/garage');
            GaragePage.successfulSignUpMessage.should('be.visible');
        });

        it('register button is enabled when all fields are valid', () => {
            RegistrationForm
                .fillName('Franc');
            RegistrationForm
                .fillLastName('Garfield');
            RegistrationForm
                .fillEmail('frank.garfield@gmail.com');
            RegistrationForm
                .fillPassword('Password1');
            RegistrationForm
                .fillRepeatPassword('Password1');
            RegistrationForm.registerButton.should('be.enabled');
        });

        it('register button is disabled when data is invalid', () => {
            RegistrationForm
                .fillName('Frank');
            RegistrationForm
                .fillLastName('Garfield');
            RegistrationForm
                .fillEmail('frank.garfield@gmail.com');
            RegistrationForm
                .fillPassword('Password1');
            RegistrationForm
                .fillRepeatPassword('Password2');
            RegistrationForm.registerButton.should('be.disabled');
        });

    });
})


