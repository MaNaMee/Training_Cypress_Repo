class CCpage {
    // // Define locators  
    cc_name = '[data-qa="name-on-card"]' ;
    cc_number = '[data-qa="card-number"]';
    cc_cvc = '[data-qa="cvc"]';
    cc_month = '[data-qa="expiry-month"]';
    cc_year = '[data-qa="expiry-year"]';
    cc_confirmBTn = '[data-qa="pay-button"]' ;

    // Method to fill the CC form
    fillCCForm({
        username,
        cc_number,
        cc_cvv,
        cc_exp_month,
        cc_exp_year
    }) {

        cy.get(this.cc_name).type(username)
        cy.get(this.cc_number).type(cc_number)
        cy.get(this.cc_cvc).type(cc_cvv)
        cy.get(this.cc_month).type(cc_exp_month)
        cy.get(this.cc_year).type(cc_exp_year)
    }
  
    // Method to submit the CC form
    submitCCForm() {
      cy.get(this.cc_confirmBTn).click();
    }

    checkCCName(username) {
        cy.get(this.cc_name).should('have.value', username)
    }

    checkCCNumber(CC_Number) {
        cy.get(this.cc_number).should('have.value', CC_Number)
    }

    checkCC_CVV(CC_CVV) {
        cy.get(this.cc_cvc).should('have.value', CC_CVV)
    }

    checkCCMonth(CC_Month) {
        cy.get(this.cc_month).should('have.value', CC_Month)
    }

    checkCCYear(CC_Year){
        cy.get(this.cc_year).should('have.value', CC_Year)
    }
  
    // Method to verify successful signup
    verifySignUpSuccess(username) {
      cy.get(this.welcomeMessage).should('contain.text', `Welcome ${username}`);
    }

    assertOrderConfirmation(){
        cy.get('[data-qa="order-placed"] > b').should('contain','Order Placed!').should('be.visible')
        cy.get('.col-sm-9 > p').should('contain','Congratulations! Your order has been confirmed!').should('be.visible')
        cy.get('[data-qa="continue-button"]').should('be.visible').should('not.be.disabled').and('contain', 'Continue')
        cy.get('[data-qa="continue-button"]').click()
    }
  }
  
  export default new CCpage();