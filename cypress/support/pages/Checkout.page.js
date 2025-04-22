class CheckoutPage {

    productLocator = '[id^="product-"] > .cart_description > h4 > a'; // Matches all products dynamically


    assertDeliveryInvoice(type, RegisteredUser){
     cy.get(`#address_${type} > .address_firstname`)
        .should('contain', ` ${RegisteredUser.fname} ${RegisteredUser.lname}`);
   
    cy.get(`#address_${type} > :nth-child(4)`).should('contain', RegisteredUser.address);
    cy.get(`#address_${type} > :nth-child(5)`).should('contain', RegisteredUser.address2);

    cy.get(`#address_${type} > .address_city`).should('contain', RegisteredUser.city);
    cy.get(`#address_${type} > .address_state_name`).should('contain', RegisteredUser.state);
    cy.get(`#address_${type} > .address_postcode`).should('contain', RegisteredUser.zipcode);

    cy.get(`#address_${type} > .address_country_name`).should('contain', RegisteredUser.random_country);
    cy.get(`#address_${type} > .address_phone`).should('contain', RegisteredUser.mobile_number);
    }
  
    // Method to place order
    placeOrder() {
      cy.contains('Place Order').should('be.visible').should('not.be.disabled').click()
    }
  
    // Method to verify successful signup
    verifySignUpSuccess(username) {
      cy.get(this.welcomeMessage).should('contain.text', `Welcome ${username}`);
    }

    checkAnyProductInCart() {
        cy.get(this.productLocator).then((products) => {
            //actual checker if there are any products in the cart
            expect(products.length).to.be.greaterThan(0, 'No products found in the cart!');
        });
    }

    writeComment(testcasenumber){
        cy.get('.form-control').should('be.visible').and('not.be.disabled')
        cy.get('.form-control').type(`Test Case ${testcasenumber}`)
    }



  }
  
  export default new CheckoutPage();
