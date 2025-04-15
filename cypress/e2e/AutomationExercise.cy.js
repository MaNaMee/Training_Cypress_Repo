import { faker } from '@faker-js/faker';
import { generateCustomerInformation } from "../support/utils"

// describe('Test Case 14: Place Order: Register while Checkout', () => {
    
//     beforeEach(() => {
//         cy.visit('http://automationexercise.com')
//     })
//     it('Test Case 14: Place Order: Register while Checkout', () => {

//         const username = faker.person.fullName()
//         const fname = faker.person.firstName()
//         const lname = faker.person.lastName()
//         const address = faker.location.streetAddress()
//         const address2 = faker.location.secondaryAddress()
//         //const country = faker.location.country()
//         const state = faker.location.state()
//         const city = faker.location.city()
//         const zipcode = faker.location.zipCode()
//         const mobile_number = faker.phone.number()
//         const expiryDate = faker.date.future()
//         const allowedCountries = ['India','United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore'];
//         const country = faker.helpers.arrayElement(allowedCountries);


//         //3. Verify that home page is visible successfully
//         cy.contains('Features Items').should('be.visible')
//         cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo').should('contain','Blue Top').should('be.visible')
//         cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').should('contain', 'View Product').should('not.be.disabled').click()
        
//         //View Product page assertion and details
//         cy.url().should('include', '/product_details/1')
//         cy.get('.view-product > img').should('be.visible')
//         cy.get('.product-information > h2').should('contain','Blue Top').should('be.visible')
//         cy.get('.product-information > :nth-child(3)').should('contain','Category: Women > Tops')
//         cy.get('#quantity').should('have.value', 1)
//         cy.get(':nth-child(5) > .btn').should('not.be.disabled').click()

//         // Modal confirmation for added product
//         cy.get('.icon-box > .material-icons').should('be.visible')
//         cy.get('.modal-body > :nth-child(1)').should('contain','Your product has been added to cart.').and('be.visible')
//         cy.get('.modal-footer > .btn').should('be.visible').should('not.be.disabled').click()

//         //Verify that cart page is displayed
//         cy.get('.shop-menu > .nav > :nth-child(3)').should('contain',' Cart').should('not.be.disabled').click()
//         cy.url().should('include', '/view_cart')
//         cy.get('.breadcrumb').should('contain', 'Shopping Cart').and('be.visible')
//         //improvement: check if actual product is displayed on the cart screen
//         cy.get('.col-sm-6 > .btn').should('not.be.disabled').click()

//         //Checkout modal
//         cy.get('.modal-title').should('contain', 'Checkout').should('be.visible')
//         cy.get('.modal-body > :nth-child(1)').should('contain', 'Register / Login account to proceed on checkout.').and('be.visible')
//         cy.get('.modal-body > :nth-child(2) > a > u').should('not.be.disabled').click()

//         // //9. Fill all details in Signup and create account
//         //New User Signup!
//         cy.url().should('include','/login')
//         cy.get('[data-qa="signup-name"]').should('be.visible').type(username)
//         cy.get('[data-qa="signup-email"]').should('be.visible').type(faker.internet.email())
//         cy.get('[data-qa="signup-button"]').should('contain', 'Signup').should('not.be.disabled').click()

//         //Account Creation
//         cy.get(':nth-child(3) > .top').should('not.be.disabled').click() // Mr/Ms Radio button
//         cy.get('[data-qa="password"]').should('not.be.disabled').should('not.have.attr', 'readonly')
//         cy.get('[data-qa="password"]').type(faker.internet.password())
//         cy.get('[data-qa="days"]').select(faker.number.int({ min:1, max: 31}))
//         cy.get('[data-qa="months"]').select(faker.date.month())
//         const RandomYear = faker.number.int({min: 1900, max: 2021})
//         cy.get('[data-qa="years"]').select(RandomYear.toString())
//         cy.get('[data-qa="first_name"]').should('not.be.disabled').type(fname)
//         cy.get('[data-qa="last_name"]').should('not.be.disabled').type(lname)
//         cy.get('[data-qa="address"]').should('not.be.disabled').type(address)
//         cy.get('[data-qa="address2"]').should('not.be.disabled').type(address2)
//         cy.get('[data-qa="country"]').should('not.be.disabled').select(country)
//         cy.get('[data-qa="state"]').should('not.be.disabled').type(state)
//         cy.get('[data-qa="city"]').should('not.be.disabled').type(city)
//         cy.get('[data-qa="zipcode"]').should('not.be.disabled').type(zipcode)
//         cy.get('[data-qa="mobile_number"]').should('not.be.disabled').type(mobile_number)
//         cy.get('[data-qa="create-account"]').should('contain', 'Create Account').should('not.be.disabled').click()

//         //Assert Account Creation
//         cy.get('b').should('contain', 'Account Created!').should('be.visible')
//         cy.get('.col-sm-9 > :nth-child(2)').should('contain', 'Congratulations! Your new account has been successfully created!').should('be.visible')
//         cy.get('[data-qa="continue-button"]').should('not.be.disabled').should('be.visible').click()

//         //Assert Logged-in as Created user
//         cy.get(':nth-child(10) > a').should('contain', `Logged in as ${username}`);

//         //Reused cart code 
//         cy.get('.shop-menu > .nav > :nth-child(3)').should('contain',' Cart').should('not.be.disabled').click()
//         cy.url().should('include', '/view_cart')
//         cy.get('.breadcrumb').should('contain', 'Shopping Cart').and('be.visible')
//         //improvement: check if actual product is displayed on the cart screen
//         cy.get('.col-sm-6 > .btn').should('not.be.disabled').click()

//         //Billing and Deliver address verification

//         cy.contains(fname).should('be.visible')
//         cy.contains(lname).should('be.visible')
//         cy.contains(address).should('be.visible')
//         cy.contains(address2).should('be.visible')
//         cy.contains(state).should('be.visible')
//         cy.contains(city).should('be.visible')
//         cy.contains(zipcode).should('be.visible')
//         cy.contains(country).should('be.visible')
//         cy.contains(mobile_number).should('be.visible')

//         //Assert There is a product 
//         cy.get('#product-1').should('be.visible')

//         //Add comment and click place order
//         cy.get('.form-control').should('be.visible').and('not.be.disabled')
//         cy.get('.form-control').type('Blue top description')
//         cy.get(':nth-child(7) > .btn').should('contain', 'Place Order').should('be.visible').click()

//         //Enter Credit card credentials
//         cy.get('[data-qa="name-on-card"]').should('be.visible').should('not.be.disabled')
//         cy.get('[data-qa="name-on-card"]').type(username)
//         cy.get('[data-qa="card-number"]').should('be.visible').should('not.be.disabled')
//         cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
//         cy.get('[data-qa="cvc"]').should('be.visible').should('not.be.disabled')
//         cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
//         cy.get('[data-qa="expiry-month"]').should('be.visible').should('not.be.disabled')
//         cy.get('[data-qa="expiry-month"]').type(String(expiryDate.getMonth() + 1).padStart(2, '0'))
//         cy.get('[data-qa="expiry-year"]').should('be.visible').should('not.be.disabled')
//         cy.get('[data-qa="expiry-year"]').type(String(expiryDate.getFullYear()))
//         cy.get('[data-qa="pay-button"]').should('be.visible').and('contain','Pay and Confirm Order')
//         cy.get('[data-qa="pay-button"]').click() 
//         //cy.get('#success_message > .alert-success').should('contain','Your order has been placed successfully!').and('be.visible')
//         //cy.contains('Your order has been placed successfully!').should('be.visible');
//         //cy.wait(1500)

//         //Assert confirmation message
        
//         cy.get('[data-qa="order-placed"] > b').should('contain','Order Placed!').should('be.visible')
//         cy.get('.col-sm-9 > p').should('contain','Congratulations! Your order has been confirmed!').should('be.visible')
//         cy.get('[data-qa="continue-button"]').should('be.visible').should('not.be.disabled').and('contain', 'Continue')
//         cy.get('[data-qa="continue-button"]').click()

//         //Account deletion
//         cy.get('.shop-menu > .nav > :nth-child(5) > a').should('be.visible').should('not.be.disabled').and('contain', 'Delete Account')
//         cy.get('.shop-menu > .nav > :nth-child(5) > a').click()

//         //Assert Account deletion
//         cy.url().should('include','/delete_account')
//         cy.get('b').should('contain', 'Account Deleted!').should('be.visible')
//         cy.get('.col-sm-9 > :nth-child(2)').should('contain','Your account has been permanently deleted!').and('be.visible')
//         cy.get('[data-qa="continue-button"]').should('contain', 'Continue').should('not.be.disabled').and('be.visible')
//         cy.get('[data-qa="continue-button"]').click()
//     })

    

// })

describe('Test Case 15: Place Order: Register before Checkout', () => {
    beforeEach(() => {
        cy.visit('http://automationexercise.com')
    })

    it('Test Case 15: Place Order: Register before Checkout', () =>{

        //3. Verify that home page is visible successfully
        cy.contains('Features Items').should('be.visible')
        cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo').should('contain','Blue Top').should('be.visible')
        // cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').should('contain', 'View Product').should('not.be.disabled').click()       

        //4. Click 'Signup / Login' button
        cy.get('.shop-menu > .nav > :nth-child(4) > a').should('contain','Signup / Login').and('be.visible').click()

        //5. Fill all details in Signup and create account

        const NewUser = generateCustomerInformation()
        cy.generateUserInfo(NewUser)
        cy.AE_CreateUser()

        // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        cy.get('b').should('contain', 'Account Created!').should('be.visible')
        cy.get('.col-sm-9 > :nth-child(2)').should('contain', 'Congratulations! Your new account has been successfully created!').should('be.visible')
        cy.get('[data-qa="continue-button"]').should('not.be.disabled').should('be.visible').click()

        //7. Verify ' Logged in as username' at top
        cy.readFile('cypress/fixtures/RegisteredUser.json').then((info) => {
            cy.get(':nth-child(10) > a').should('contain', `Logged in as ${info.username}`);
        })
       
        // 8. Add products to cart
        cy.AddProduct(3)
        cy.AddProduct(6)
        cy.AddProduct(9)

        // 9. Click 'Cart' button && 10. Verify that cart page is displayed && 11. Click Proceed To Checkout
        cy.get('.shop-menu > .nav > :nth-child(3)').should('contain',' Cart').should('not.be.disabled').click()
        cy.url().should('include', '/view_cart')
        cy.get('.breadcrumb').should('contain', 'Shopping Cart').and('be.visible')
        //improvement: check if actual product is displayed on the cart screen
        cy.get('.col-sm-6 > .btn').should('not.be.disabled').click()

        //12. Verify Address Details and Review Your Order
        cy.readFile('cypress/fixtures/RegisteredUser.json').then((RegUser) => {
            cy.Verify_Delivery_Invoice('delivery', NewUser)
            cy.Verify_Delivery_Invoice('invoice', NewUser)
    
        })
        //13. Enter description in comment text area and click 'Place Order'
        cy.get('.form-control').should('be.visible').and('not.be.disabled')
        cy.get('.form-control').type('Blue top description')
        cy.get(':nth-child(7) > .btn').should('contain', 'Place Order').should('be.visible').click()

        //14. Enter payment details: Name on Card, Card Number, CVC, Expiration date && 15. Click 'Pay and Confirm Order' button && 16. Verify success message 'Your order has been placed successfully!'
        cy.Add_CCinfo()

        //17. Click 'Delete Account' button && 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        cy.Delete_Account()
    })

})

describe('Test Case 16: Place Order: Login before Checkoutt', () => {
    before(() => {
        cy.visit('http://automationexercise.com')
        cy.get('.shop-menu > .nav > :nth-child(4) > a').should('contain','Signup / Login').and('be.visible').click()
        const NewUser = generateCustomerInformation()
        cy.generateUserInfo(NewUser)
        cy.AE_CreateUser()
        cy.get('b').should('contain', 'Account Created!').should('be.visible')
        cy.get('.col-sm-9 > :nth-child(2)').should('contain', 'Congratulations! Your new account has been successfully created!').should('be.visible')
        cy.get('[data-qa="continue-button"]').should('not.be.disabled').should('be.visible').click()
        cy.get('.shop-menu > .nav > :nth-child(4) > a').should('contain', 'Logout').should('be.visible').click()
        cy.visit('http://automationexercise.com')

    })

    it('Test Case 16: Place Order: Login before Checkout' , () => {
        //3. Verify that home page is visible successfully
        cy.contains('Features Items').should('be.visible')
        cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo').should('contain','Blue Top').should('be.visible')
        // cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').should('contain', 'View Product').should('not.be.disabled').click()       

        //4. Click 'Signup / Login' button
        cy.get('.shop-menu > .nav > :nth-child(4) > a').should('contain','Signup / Login').and('be.visible').click()

        //5. Fill email, password and click 'Login' button && 6. Verify 'Logged in as username' at top
        cy.AE_Login()

        //7. Add products to cart
        cy.AddProduct(3)
        cy.AddProduct(6)
        cy.AddProduct(9)

        // 8. Click 'Cart' button && 9. Verify that cart page is displayed && 10. Click Proceed To Checkout
        cy.get('.shop-menu > .nav > :nth-child(3)').should('contain',' Cart').should('not.be.disabled').click()
        cy.url().should('include', '/view_cart')
        cy.get('.breadcrumb').should('contain', 'Shopping Cart').and('be.visible')
        //improvement: check if actual product is displayed on the cart screen
        cy.get('.col-sm-6 > .btn').should('not.be.disabled').click()

        //11. Verify Address Details and Review Your Order
        cy.readFile('cypress/fixtures/RegisteredUser.json').then((RegUser) => {
            cy.Verify_Delivery_Invoice('delivery', RegUser)
            cy.Verify_Delivery_Invoice('invoice', RegUser)
        })

        //12. Enter description in comment text area and click 'Place Order'
        cy.get('.form-control').should('be.visible').and('not.be.disabled')
        cy.get('.form-control').type('Blue top description')
        cy.get(':nth-child(7) > .btn').should('contain', 'Place Order').should('be.visible').click()


        // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date && 14. Click 'Pay and Confirm Order' button && 15. Verify success message 'Your order has been placed successfully!'
        cy.Add_CCinfo()

        // 16. Click 'Delete Account' button && 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        cy.Delete_Account()
    })
})