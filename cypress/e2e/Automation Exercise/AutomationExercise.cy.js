import { faker } from '@faker-js/faker';
import { generateCustomerInformation } from "../../support/utils"

describe('Test Case 14: Place Order: Register while Checkout', () => {
    
    beforeEach(() => {
        cy.visit('http://automationexercise.com')
    })
    it('Test Case 14: Place Order: Register while Checkout', () => {

        //Verify that home page is visible successfully
        cy.contains('Features Items').should('be.visible')

        //Add products to cart
        cy.AddProduct(4)
        cy.AddProduct(7)
       
        //Verify that cart page is displayed
        cy.AE_Cart()

        //Checkout modal
        cy.get('.modal-title').should('contain', 'Checkout').should('be.visible')
        cy.get('.modal-body > :nth-child(1)').should('contain', 'Register / Login account to proceed on checkout.').and('be.visible')
        cy.get('.modal-body > :nth-child(2) > a > u').should('not.be.disabled').click()

        //Fill all details in Signup and create account
        //New User Signup!
        const NewUser = generateCustomerInformation()
        cy.generateUserInfo(NewUser)
        cy.AE_CreateUser()

        //Reused cart code 
        cy.AE_Cart()

        //Billing and Deliver address verification
        cy.AE_Checkout(14) // 14 is the test case number

        //Enter Credit card credentials
        cy.Add_CCinfo()

        //Account deletion
        cy.Delete_Account()
    })

    

})

describe('Test Case 15: Place Order: Register before Checkout', () => {
    beforeEach(() => {
        cy.visit('http://automationexercise.com')
    })

    it('Test Case 15: Place Order: Register before Checkout', () =>{

        //Verify that home page is visible successfully
        cy.contains('Features Items').should('be.visible')
        cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo').should('contain','Blue Top').should('be.visible')

        const NewUser = generateCustomerInformation()
        cy.generateUserInfo(NewUser)
        cy.AE_CreateUser()

        //Add products to cart
        cy.AddProduct(3)
        cy.AddProduct(6)
        cy.AddProduct(9)

        cy.AE_Cart()
        cy.AE_Checkout(15)
        cy.Add_CCinfo()

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
        cy.get('.shop-menu > .nav > :nth-child(4) > a').should('contain', 'Logout').should('be.visible').click()
        cy.visit('http://automationexercise.com')

    })

    it('Test Case 16: Place Order: Login before Checkout' , () => {
        //Verify that home page is visible successfully
        cy.contains('Features Items').should('be.visible')

        //Click 'Signup / Login' button
        cy.AE_Login()

        //Add products to cart
        cy.AddProduct(3)
        cy.AddProduct(6)
        cy.AddProduct(9)

        cy.AE_Cart()
        cy.AE_Checkout(16)

        cy.Add_CCinfo()

        cy.Delete_Account()
    })
})