describe('login function testing - ', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/'); // Runs before every test
  });

  it('Verify that the user can login successfully', () => {
    cy.visit('https://www.saucedemo.com/') // navigate to login website
    cy.get('[data-test="username"]').type("standard_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('[data-test="login-button"]').click()

    cy.contains('Swag Labs').should('be.visible')
    cy.url().should("include","/inventory.html")
  })

  it("Verify invalid login credentials successfully prevents user to login", () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type("user_standard")
    cy.get('[data-test="password"]').type("sauce_secret")
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('be.visible').contains("Epic sadface: Username and password do not match any user in this service")
    cy.contains('Epic sadface').should('be.visible')
    cy.url().should('include','saucedemo.com')

  })
})
