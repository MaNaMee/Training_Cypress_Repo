class AE_RegistrationPage {
    // Define locators
    firstNameInput = '[data-qa="first_name"]';
    lastNameInput = '[data-qa="last_name"]';
    addressInput = '[data-qa="address"]';
    address2Input = '[data-qa="address2"]';
    countryInput = '[data-qa="country"]';
    cityInput = '[data-qa="city"]';
    stateInput = '[data-qa="state"] ';
    zipCodeInput = '[data-qa="zipcode"]';
    mobileNumInput = '[data-qa="mobile_number"]';
    usernameInput = '[data-qa="name"]';
    passwordInput = '[data-qa="password"]';
    registerButton = '[data-qa="create-account"]';
    welcomeMessage = 'h1.title';
    EmailInput ='[data-qa="email"]';
    DayInput = '[data-qa="days"]';
    MonthInput = '[data-qa="months"]';
    YearInput = '[data-qa="years"]';
    MrMsInput = ':nth-child(3) > .top'
  
    // Method to fill the register form
    fillSignUpForm({
      fname,
      lname,
      address,
      address2,
      days,
      month,
      year,
      random_country,
      city,
      state,
      zipcode,
      mobile_number,
      username,
      password,
      email,
    }) {
      cy.get(this.MrMsInput).click()
      cy.get(this.passwordInput).type(password);
      cy.get(this.firstNameInput).type(fname);
      cy.get(this.lastNameInput).type(lname);
      cy.get(this.addressInput).type(address);
      cy.get(this.address2Input).type(address2);
      cy.get(this.DayInput).select(days);
      cy.get(this.MonthInput).select(month);
      cy.get(this.YearInput).select(year);
      cy.get(this.countryInput).select(random_country);
      cy.get(this.stateInput).type(state);
      cy.get(this.cityInput).type(city);
      cy.get(this.zipCodeInput).type(zipcode);
      cy.get(this.mobileNumInput).type(mobile_number);
    }
  
    // Method to submit the signup form
    submitRegForm() {
      cy.get(this.registerButton).click();
    }

    checkNamefield(username) {
        cy.get(this.usernameInput).should('have.value',username )
    }
    checkEmailField(email) {
        cy.get(this.EmailInput).should('have.value',email )
    }
    checkPasswordField(password) {
        cy.get(this.passwordInput).should('have.value', password)
    }
    checkDOBFields(days, years) {
        cy.get(this.DayInput).should('have.value', days)
        cy.get(this.YearInput).should('have.value', years)
    }
    checkFnameField(firstname) {
        cy.get(this.firstNameInput).should('have.value', firstname)
    }
    checkLnameField(lastname) {
        cy.get(this.lastNameInput).should('have.value', lastname)
    }
    checkAddressField(address) {    
        cy.get(this.addressInput).should('have.value', address)
    }
    checkAddress2Field(address2) {
        cy.get(this.address2Input).should('have.value', address2)
    }
    checkCountryField(country) {  
        cy.get(this.countryInput).should('have.value', country)
    }
    checkStateField(state) {
        cy.get(this.stateInput).should('have.value', state)
    }
    checkCityField(city) {
        cy.get(this.cityInput).should('have.value', city)
    }
    checkZIPField(zip) {
        cy.get(this.zipCodeInput).should('have.value', zip)
    }
    checkNumField(num) {
        cy.get(this.mobileNumInput).should('have.value', num)
    }
  
    // Method to verify successful login attempt
    verifyLogInSuccess() {
        cy.readFile('cypress/fixtures/RegisteredUser.json').then((info) => {
                cy.get(':nth-child(10) > a').should('contain', `Logged in as ${info.username}`);
            })
    }

    assertAccountCreation(){
        cy.get('b').should('contain', 'Account Created!').should('be.visible')
        cy.get('.col-sm-9 > :nth-child(2)').should('contain', 'Congratulations! Your new account has been successfully created!').should('be.visible')
        cy.get('[data-qa="continue-button"]').should('not.be.disabled').should('be.visible').click()
    }

  }
  
  export default new AE_RegistrationPage();