class ExpensesPage {

    visit() {
        cy.visit('/panel/expenses');
    }

    get url() {
        return cy.url();
    }

    get addExpenseButton() {
        return cy.contains('button', 'Add an expense');
    }

    get successfulExpenseAddedMessage() {
        return cy.contains('.alert-success', 'Fuel expense added');
    }

    get expenseMileage() {
        return cy.get('.expenses_table tbody tr')
            .first()
            .find('td')
            .eq(1);
    }

    get expenseLiters() {
        return cy.get('.expenses_table tbody tr')
            .first()
            .find('td')
            .eq(2);
    }

    get expenseTotalCost() {
        return cy.get('.expenses_table tbody tr')
            .first()
            .find('td')
            .eq(3);
    }

    openAddExpenseForm() {
        this.addExpenseButton.click();
    }
}

export default new ExpensesPage();