/// <reference types="cypress" /> 

describe('Registration', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('.btn-primary').click();
    });

    context('Registration modal', () => {
        it('Validate Registration title text', () => {
            cy.get('.modal-header').should('contain.text', 'Registration');
        });
    });

    context('Name field validation', () => {

        it('valid name', () => {
            cy.get('#signupName').type('Frank');
            cy.get('#signupName').blur();
            cy.get('#signupName').should('have.value', 'Frank');
            cy.get('#signupName').should('not.have.class', 'is-invalid');
        });

        it('valid name with 2 symbols', () => {
            cy.get('#signupName').type('Fr');
            cy.get('#signupName').blur();
            cy.get('#signupName').should('have.value', 'Fr');
            cy.get('#signupName').should('not.have.class', 'is-invalid');
        });

        it('valid name with 20 symbols', () => {
            cy.get('#signupName').type('VeryLongNameTypeHere');
            cy.get('#signupName').blur();
            cy.get('#signupName').should('have.value', 'VeryLongNameTypeHere');
            cy.get('#signupName').should('not.have.class', 'is-invalid');
        });

        // Тест падає бо фактичний текст помилки 'Name required')
        it('error for empty name', () => {
            cy.get('#signupName').click();
            cy.get('#signupName').blur();
            cy.get('#signupName').siblings('.invalid-feedback').should('contain.text', 'Name is required');
        });

        it('error for invalid name -> not EN symbol', () => {
            cy.get('#signupName').type('привіт');
            cy.get('#signupName').blur();
            cy.get('#signupName').siblings('.invalid-feedback').should('contain.text', 'Name is invalid');
        })

        it('error when name is shorter than 2 characters', () => {
            cy.get('#signupName').type('A');
            cy.get('#signupName').blur();
            cy.get('#signupName').siblings('.invalid-feedback').should('contain.text', 'Name has to be from 2 to 20 characters long');
        });

        it('error when name is longer than 20 characters', () => {
            cy.get('#signupName').type('VeryLongNameIsWrittenHere');
            cy.get('#signupName').blur();
            cy.get('#signupName').siblings('.invalid-feedback').should('contain.text', 'Name has to be from 2 to 20 characters long');
        });

        // Падає через вимоги
        it('name trims trailing spaces', () => {
            cy.get('#signupName').type('Frank      ');
            cy.get('#signupName').blur();
            cy.get('#signupName').should('have.value', 'Frank');
        });
        // Падає через вимоги
        it('name trims leading spaces', () => {
            cy.get('#signupName').type('      Frank');
            cy.get('#signupName').blur();
            cy.get('#signupName').should('have.value', 'Frank');
        });
        // Падає через вимоги
        it('name trims leading and trailing spaces', () => {
            cy.get('#signupName').type('    Frank    ');
            cy.get('#signupName').blur();
            cy.get('#signupName').should('have.value', 'Frank');
        });
        // Падає через вимоги
        it('name trims spaces-only input', () => {
            cy.get('#signupName').type('      ');
            cy.get('#signupName').blur();
            cy.get('#signupName').siblings('.invalid-feedback').should('contain.text', 'Name is required');
        });

        it('invalid name border color is red', () => {
            cy.get('#signupName').click();
            cy.get('#signupName').blur();
            cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    context('Last name field validation', () => {

        it('valid last name', () => {
            cy.get('#signupLastName').type('Garfield');
            cy.get('#signupLastName').blur();
            cy.get('#signupLastName').should('have.value', 'Garfield');
            cy.get('#signupLastName').should('not.have.class', 'is-invalid');
        });

        it('valid last name with 2 symbols', () => {
            cy.get('#signupLastName').type('Ga');
            cy.get('#signupLastName').blur();
            cy.get('#signupLastName').should('have.value', 'Ga');
            cy.get('#signupLastName').should('not.have.class', 'is-invalid');
        });

        it('valid last name with 20 symbols', () => {
            cy.get('#signupLastName').type('VeryLongLastNameHere');
            cy.get('#signupLastName').blur();
            cy.get('#signupLastName').should('have.value', 'VeryLongLastNameHere');
            cy.get('#signupLastName').should('not.have.class', 'is-invalid');
        });

        // Тест падає бо фактичний текст помилки 'Last name required')
        it('error for empty last name', () => {
            cy.get('#signupLastName').click();
            cy.get('#signupLastName').blur();
            cy.get('#signupLastName').siblings('.invalid-feedback').should('contain.text', 'Last name is required');
        });

        it('error for invalid last name -> not EN symbol', () => {
            cy.get('#signupLastName').type('привіт');
            cy.get('#signupLastName').blur();
            cy.get('#signupLastName').siblings('.invalid-feedback').should('contain.text', 'Last name is invalid');
        });

        it('error when last name is less than 2 characters', () => {
            cy.get('#signupLastName').type('A');
            cy.get('#signupLastName').blur();
            cy.get('#signupLastName').siblings('.invalid-feedback').should('contain.text', 'Last name has to be from 2 to 20 characters long');
        });

        it('error when last name is more than 20 characters', () => {
            cy.get('#signupLastName').type('VeryLongNameIsWrittenHere');
            cy.get('#signupLastName').blur();
            cy.get('#signupLastName').siblings('.invalid-feedback').should('contain.text', 'Last name has to be from 2 to 20 characters long');
        });

        // Падає через вимоги
        it('last name trims trailing spaces', () => {
            cy.get('#signupLastName').type('Garfield  ');
            cy.get('#signupLastName').blur();
            cy.get('#signupLastName').should('have.value', 'Garfield');
        });
        // Падає через вимоги
        it('last name trims leading spaces', () => {
            cy.get('#signupLastName').type('  Garfield');
            cy.get('#signupLastName').blur();
            cy.get('#signupLastName').should('have.value', 'Garfield');
        });
        // Падає через вимоги
        it('last name trims leading and trailing spaces', () => {
            cy.get('#signupLastName').type(' Garfield ');
            cy.get('#signupLastName').blur();
            cy.get('#signupLastName').should('have.value', 'Garfield');
        });
        // Падає через вимоги
        it('last name trims spaces-only input', () => {
            cy.get('#signupLastName').type('      ');
            cy.get('#signupLastName').blur();
            cy.get('#signupLastName').siblings('.invalid-feedback').should('contain.text', 'Last name is required');
        });

        it('invalid last name border color is red', () => {
            cy.get('#signupLastName').click();
            cy.get('#signupLastName').blur();
            cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    context('Email field validation', () => {

        it('valid email - 1', () => {
            cy.get('#signupEmail').type('frank.garfield@gmail.com');
            cy.get('#signupEmail').blur();
            cy.get('#signupEmail').should('have.value', 'frank.garfield@gmail.com');
            cy.get('#signupEmail').should('not.have.class', 'is-invalid');
        });

        it('valid email - 2', () => {
            cy.get('#signupEmail').type('12345@gmail.com');
            cy.get('#signupEmail').blur();
            cy.get('#signupEmail').should('have.value', '12345@gmail.com');
            cy.get('#signupEmail').should('not.have.class', 'is-invalid');
        });

        it('valid email - 3', () => {
            cy.get('#signupEmail').type('frank_-_!#12345@gmail.com');
            cy.get('#signupEmail').blur();
            cy.get('#signupEmail').should('have.value', 'frank_-_!#12345@gmail.com');
            cy.get('#signupEmail').should('not.have.class', 'is-invalid');
        });

        it('error for empty email', () => {
            cy.get('#signupEmail').click();
            cy.get('#signupEmail').blur();
            cy.get('#signupEmail').siblings('.invalid-feedback').should('contain.text', 'Email required');
        });

        it('error for invalid email 1', () => {
            cy.get('#signupEmail').type('abc');
            cy.get('#signupEmail').blur();
            cy.get('#signupEmail').siblings('.invalid-feedback').should('contain.text', 'Email is incorrect');
        });

        it('error for invalid email 2', () => {
            cy.get('#signupEmail').type('abc@gmail');
            cy.get('#signupEmail').blur();
            cy.get('#signupEmail').siblings('.invalid-feedback').should('contain.text', 'Email is incorrect');
        });

        it('invalid email border color is red', () => {
            cy.get('#signupEmail').click();
            cy.get('#signupEmail').blur();
            cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    context('Password field validation', () => {

        it('valid password', () => {
            cy.get('#signupPassword').type('Password1');
            cy.get('#signupPassword').blur();
            cy.get('#signupPassword').should('have.value', 'Password1');
            cy.get('#signupPassword').should('not.have.class', 'is-invalid');
        });

        it('valid password with special symbol', () => {
            cy.get('#signupPassword').type('Password1@');
            cy.get('#signupPassword').blur();
            cy.get('#signupPassword').should('have.value', 'Password1@');
            cy.get('#signupPassword').should('not.have.class', 'is-invalid');
        });

        it('valid password with 8 characters', () => {
            cy.get('#signupPassword').type('Passwor1');
            cy.get('#signupPassword').blur();
            cy.get('#signupPassword').should('have.value', 'Passwor1');
            cy.get('#signupPassword').should('not.have.class', 'is-invalid');
        });

        it('valid password with 15 characters', () => {
            cy.get('#signupPassword').type('Password123Abcd');
            cy.get('#signupPassword').blur();
            cy.get('#signupPassword').should('have.value', 'Password123Abcd');
            cy.get('#signupPassword').should('not.have.class', 'is-invalid');
        });

        it('error for empty password', () => {
            cy.get('#signupPassword').click();
            cy.get('#signupPassword').blur();
            cy.get('#signupPassword').siblings('.invalid-feedback').should('contain.text', 'Password required')
        });

        it('error when password is less than 8 characters', () => {
            cy.get('#signupPassword').type('Pass1');
            cy.get('#signupPassword').blur();
            cy.get('#signupPassword').siblings('.invalid-feedback')
                .should('contain.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        it('error when password is more than 15 characters', () => {
            cy.get('#signupPassword').type('Password123AbcdX');
            cy.get('#signupPassword').blur();
            cy.get('#signupPassword').siblings('.invalid-feedback')
                .should('contain.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        it('error when password without digit', () => {
            cy.get('#signupPassword').type('Password');
            cy.get('#signupPassword').blur();
            cy.get('#signupPassword').siblings('.invalid-feedback')
                .should('contain.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        it('error when password without uppercase letter', () => {
            cy.get('#signupPassword').type('password1');
            cy.get('#signupPassword').blur();
            cy.get('#signupPassword').siblings('.invalid-feedback')
                .should('contain.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        it('error when password without lowercase letter', () => {
            cy.get('#signupPassword').type('PASSWORD1');
            cy.get('#signupPassword').blur();
            cy.get('#signupPassword').siblings('.invalid-feedback')
                .should('contain.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        it('error when password with integers only', () => {
            cy.get('#signupPassword').type('12345678');
            cy.get('#signupPassword').blur();
            cy.get('#signupPassword').siblings('.invalid-feedback')
                .should('contain.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        it('error when password with specials symbols only', () => {
            cy.get('#signupPassword').type('!@#$%^&*');
            cy.get('#signupPassword').blur();
            cy.get('#signupPassword').siblings('.invalid-feedback')
                .should('contain.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        it('invalid password border color is red', () => {
            cy.get('#signupPassword').click();
            cy.get('#signupPassword').blur();
            cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    context('Re-enter password field validation', () => {

        it('valid re-enter password', () => {
            cy.get('#signupPassword').type('Password1');
            cy.get('#signupRepeatPassword').type('Password1');
            cy.get('#signupRepeatPassword').blur();
            cy.get('#signupRepeatPassword').should('have.value', 'Password1');
            cy.get('#signupRepeatPassword').should('not.have.class', 'is-invalid');
        });

        it('error for empty re-enter password', () => {
            cy.get('#signupPassword').type('Password1');
            cy.get('#signupRepeatPassword').focus();
            cy.get('#signupRepeatPassword').blur();
            cy.get('#signupRepeatPassword').siblings('.invalid-feedback').should('contain.text', 'Re-enter password required');
        });

        it('error when passwords do not match', () => {
            cy.get('#signupPassword').type('Password1');
            cy.get('#signupRepeatPassword').type('Password2');
            cy.get('#signupRepeatPassword').blur();
            cy.get('#signupRepeatPassword').siblings('.invalid-feedback').should('contain.text', 'Passwords do not match');
        });

        it('invalid re-enter password border color is red', () => {
            cy.get('#signupPassword').type('Password1');
            cy.get('#signupRepeatPassword').type('Password2');
            cy.get('#signupRepeatPassword').blur();
            cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    context('Register button', () => {

        it('registers a new user with valid data', () => {
            const email = `yevhenii.krutsiak+${Date.now()}@gmail.com`;
            cy.log(`Generated email: ${email}`);
            cy.get('#signupName').type('Erling');
            cy.get('#signupLastName').type('Haaland');
            cy.get('#signupEmail').type(email);
            cy.get('#signupPassword').type('Password1');
            cy.get('#signupRepeatPassword').type('Password1');
            cy.contains('button', 'Register').should('be.enabled').click();
            cy.url().should('include', '/panel/garage');
            cy.contains('.alert-success', 'Registration complete').should('be.visible');
        });

        it('register button is enabled when all fields are valid', () => {
            cy.get('#signupName').type('Frang');
            cy.get('#signupLastName').type('Garfield');
            cy.get('#signupEmail').type('frank.garfield@gmail.com');
            cy.get('#signupPassword').type('Password1');
            cy.get('#signupRepeatPassword').type('Password1');
            cy.contains('button', 'Register').should('be.enabled');
        });

        it('register button is disabled when data is invalid', () => {
            cy.get('#signupName').type('Frank');
            cy.get('#signupLastName').type('Garfield');
            cy.get('#signupEmail').type('frank.garfield@gmail.com');
            cy.get('#signupPassword').type('Password1');
            cy.get('#signupRepeatPassword').type('Password2');
            cy.contains('button', 'Register').should('be.disabled');
        });

    });
})


