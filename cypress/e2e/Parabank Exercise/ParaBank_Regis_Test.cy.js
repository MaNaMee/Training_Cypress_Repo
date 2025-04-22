import { generateCustomerData } from "../../support/utils"
import RegistrationPage from    

describe('Parabank User Registration', () => {
    before(() => {
        const randomUsername = `User${Math.floor(Math.random() * 10000)}`
        const randompword =`pword${Math.floor(Math.random() * 10000)}`

        Cypress.env('randomusername', randomUsername)
        Cypress.env('randompword' , randompword)
    })
    
    beforeEach(() =>{

        // const randomUsername = `User${Math.floor(Math.random() * 10000)}`
        // const randompword =`pword${Math.floor(Math.random() * 10000)}`

        // Cypress.env('randomusername', randomUsername)
        // Cypress.env('randompword' , randompword)

        cy.visit('https://parabank.parasoft.com/parabank/register.htm')
    })

    it('Should successfully create a user', () => {

        const session_username = Cypress.env('randomusername')
        const session_pword = Cypress.env('randompword')
        
        cy.url().should('include','register.htm')
        cy.get('.title').should('be.visible')
        cy.contains('First Name').should('be.visible')    
        cy.get('input[id="customer.firstName"]').should('be.visible').type('Adele')
        cy.contains('Last Name').should('be.visible')
        cy.get('input[id="customer.lastName"]').should('be.visible').type('Singer')
        cy.contains('Address').should('be.visible')
        cy.get('input[id="customer.address.street"]').should('be.visible').type('LV Leviste')
        cy.contains('City').should('be.visible')
        cy.get('input[id="customer.address.city"]').should('be.visible').type('Makati')
        cy.contains('State').should('be.visible')
        cy.get('input[id="customer.address.state"]').should('be.visible').type('NCR')
        cy.contains('Zip Code').should('be.visible')
        cy.get('input[id="customer.address.zipCode"]').should('be.visible').type('12345')
        cy.contains('Phone #').should('be.visible')
        cy.get('input[id="customer.phoneNumber"]').should('be.visible').type('123456789')
        cy.contains('SSN').should('be.visible')
        cy.get('input[id="customer.ssn"]').should('be.visible').type('238756983645')
        cy.contains('Username:').should('be.visible')
        cy.get('input[id="customer.username"]').should('be.visible').type(session_username)
        cy.contains('Password').should('be.visible')
        cy.get('input[id="customer.password"]').should('be.visible').type(session_pword)
        cy.contains('Confirm').should('be.visible')
        cy.get('input[id="repeatedPassword"]').should('be.visible').type(session_pword)
        cy.get('[colspan="2"] > .button').should('be.visible').click()
    })
    
    it('Should successfully log-in using the created account', () => {
        const session_username = Cypress.env('randomusername')
        const session_pword = Cypress.env('randompword')


        cy.get('form > :nth-child(2) > .input').should('be.visible').type(session_username)
        cy.get(':nth-child(4) > .input').should('be.visible').type(session_pword)
        cy.get(':nth-child(5) > .button').should('be.visible').click()
        cy.url().should('include','overview.htm')
    })

    it('Should successfully let the user Logout',() => {
        const session_username = Cypress.env('randomusername')
        const session_pword = Cypress.env('randompword')

        cy.PB_Login(session_username, session_pword)

        cy.url().should('include','overview.htm')
        cy.contains('Account Services').should('be.visible')
        cy.contains('Balance').should('be.visible')
        cy.get('#leftPanel > ul > :nth-child(8) > a').should('be.visible').click()
        cy.contains('Customer Login').should('be.visible')
        cy.url().should('include','index.htm')
    } )
})

describe('Parabank User Registration with Fixtures and Faker.js', () => {

    
    beforeEach(() =>{
        cy.visit('https://parabank.parasoft.com/parabank/register.htm')
    })

    it('Should successfully create a user', () => {
        
        const NewUser = generateCustomerData()
        cy.generateFixtureData(NewUser)

        cy.readFile('cypress/fixtures/UserCredentials.json').then((UserCredentials) => {
            RegistrationPage.fillSignUpForm(UserCredentials)
            RegistrationPage.submitSignUpForm()
            RegistrationPage.verifySignUpSuccess(UserCredentials.username)
        })
    })
    


    it('Should successfully log-in using the created account', () => {

        cy.wait(2000); 
        cy.fixture('UserCredentials.json').then((UserCredentials) => {
            cy.get('form > :nth-child(2) > .input').should('be.visible').type(UserCredentials.username)
            cy.get(':nth-child(4) > .input').should('be.visible').type(UserCredentials.password)
        })

        cy.get(':nth-child(5) > .button').should('be.visible').click()
        cy.url().should('include','overview.htm')
    })

    it('Should successfully let the user Logout',() => {
        const session_username = Cypress.env('randomusername')
        const session_pword = Cypress.env('randompword')

        cy.fixture('UserCredentials.json').then((UserCredentials) => {
            cy.get('form > :nth-child(2) > .input').should('be.visible').type(UserCredentials.username)
            cy.get(':nth-child(4) > .input').should('be.visible').type(UserCredentials.password)
        })

        cy.get(':nth-child(5) > .button').click()
        cy.url().should('include','overview.htm')
        cy.contains('Account Services').should('be.visible')
        cy.contains('Balance').should('be.visible')
        cy.get('#leftPanel > ul > :nth-child(8) > a').should('be.visible').click()
        cy.contains('Customer Login').should('be.visible')
        cy.url().should('contain','index.htm')
    } )
})