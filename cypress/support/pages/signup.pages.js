class SignupForm {
    // Define locators
    signupUsernameInput = '[data-qa="signup-name"]';
    signupEmailInput = '[data-qa="signup-email"]';
    signupBTN = '[data-qa="signup-button"]';
    loginEmail = '[data-qa="login-email"]' ;
    loginpassword = '[data-qa="login-password"]';
    loginBTN = '[data-qa="login-button"]';
    
    // Method to fill the initial sign-up form
    fillSignUpForm({
        username,
        email,
    }) {
      cy.get(this.signupUsernameInput).type(username);
      cy.get(this.signupEmailInput).type(email);
    }
  
    // Method to check if username is entered successfully
    checkUsernameField(username) {
        cy.get(this.signupUsernameInput, { timeout: 1500 }).should('have.value', username)
    }

    // Method to check if email is entered successfully
    checkEmailField(email){
        cy.get(this.signupEmailInput, { timeout: 1500 }).should('have.value', email)    
    }

    // Method to submit the initial signup form
    submitSignUpForm() {
      cy.get(this.signupBTN).click();
    }
  
    // Method to verify successful signup
    verifySignUpSuccess(username) {
      cy.get(this.welcomeMessage).should('contain.text', `Welcome ${username}`);
    }

    loginUser({
        email,
        password
    }) {
        cy.get(this.loginEmail).type(email)
        cy.get(this.loginpassword).type(password)
    }

    checkLoginEmailField(email){
        cy.get(this.loginEmail).should('have.value', email)
    }

    checkLoginPwordField(password){
        cy.get(this.loginpassword).should('have.value',password)
    }

    submitLoginDetails(){
        cy.get(this.loginBTN).should('be.visible').click()
    }
  }
  
  export default new SignupForm();