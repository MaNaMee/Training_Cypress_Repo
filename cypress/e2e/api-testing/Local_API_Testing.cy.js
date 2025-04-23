import { generateLocalAPIInformation } from "../../support/utils"


describe('Local API Testing', () => {
    
    let Registered_User,Registered_UserName, Registered_UserEmail, Registered_Pword
    const AUTH_TOKEN = 'Bearer STATIC_TOKEN_123'
    const BASE_URL = 'http://localhost:3000/api/users'
    const CheckerAuthToken = 'STATIC_TOKEN_123'

    before(() => {
        const user = generateLocalAPIInformation()
        const UpdatedUser = generateLocalAPIInformation()
        cy.generateLocalAPIFile(UpdatedUser)
        Registered_UserName = user.Username
        Registered_UserEmail = user.email
        Registered_Pword = user.password
    })

    it('201: Succesfully create User', () => {
        cy.api({
            method: 'POST',
            url: BASE_URL + '/register',
            body: {
                name: Registered_UserName,
                email: Registered_UserEmail,
                password: Registered_Pword
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('message', 'User registered')
            expect(response.body.user).to.have.property('id')
            expect(response.body.user.name).to.eq(Registered_UserName)
            expect(response.body.user.email).to.eq(Registered_UserEmail)
            Registered_User = response.body.user.id
        })
    })

    it('200: Successfully logged in to created user', () => {
        //cy.readFile('cypress/fixtures/RegisteredUser.json').then((LocalUser) => {
            cy.api({
                method: 'POST',
                url: BASE_URL + '/login',
                body: {
                    email: Registered_UserEmail,
                    password: Registered_Pword
                }
                }).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('token', CheckerAuthToken)
            })
        })
        
  

    it('200: Successfully get all registered users', () => {
        cy.api({
            method: 'GET',
            url: BASE_URL + '/',
            headers: {
                'Authorization': AUTH_TOKEN
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('200: Successfully get a user by ID', () => {
        cy.wrap(Registered_User).should('exist')
        cy.api({
            method: 'GET',
            url: BASE_URL + `/${Registered_User}` ,
            headers: {
                'Authorization': AUTH_TOKEN
              },
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id', Registered_User)
            expect(response.body).to.have.property('name', Registered_UserName)
            expect(response.body).to.have.property('email', Registered_UserEmail)
        })
    })

    it('200: Successfully update a user by ID', () => {
        const UpdateUser = generateLocalAPIInformation()
        cy.wrap(Registered_User).should('exist')
        cy.api({
            method: 'PUT',
            url: BASE_URL + `/${Registered_User}`,
            headers: {
                'Authorization': AUTH_TOKEN
            },
            body: {
                name: UpdateUser.Username,
                email: UpdateUser.email,
                password: UpdateUser.password
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('User updated')
            expect(response.body.user).to.have.property('id', Registered_User) 
            expect(response.body.user).to.have.property('name', UpdateUser.Username)
            expect(response.body.user).to.have.property('email', UpdateUser.email)
            Registered_Pword = UpdateUser.password
        })
})

    it('200: Successfully partially update a name of user according to user ID', () => {
        const UpdatedName = generateLocalAPIInformation()
        cy.wrap(Registered_User).should('exist')
        cy.api({
            method: 'PATCH',
            url: BASE_URL + `/${Registered_User}`,
            headers: {
                'Authorization': AUTH_TOKEN
            },
            body:{
                name: UpdatedName.Username
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('message', "Successfully updated the name")
            expect(response.body.user).to.have.property('id',Registered_User)
            expect(response.body.user).to.have.property('name', UpdatedName.Username)
        })
    })

    it('200: Successfully partially update email of user according to their user id', () => {
        const UpdateEmail = generateLocalAPIInformation()
        cy.wrap(Registered_User).should('exist')
        cy.api({
            method: 'PATCH',
            url: BASE_URL + `/${Registered_User}`,
            headers: {
                'Authorization': AUTH_TOKEN
            },
            body: {
                email: UpdateEmail.email
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('message', "Successfully updated the email")
            expect(response.body.user).to.have.property('id',Registered_User)
            expect(response.body.user).to.have.property('email', UpdateEmail.email)
        })
    })

    it('200: Successfully partially update the name and email of user according to their user id', () => {
        const UpdateNameEmail = generateLocalAPIInformation()
        cy.wrap(Registered_User).should('exist')
        cy.api({
            method: 'PATCH',
            url: BASE_URL + `/${Registered_User}`,
            headers: {
                'Authorization': AUTH_TOKEN
            },
            body: {
                name: UpdateNameEmail.Username,
                email: UpdateNameEmail.email
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('message', 'Successfully updated the name, email')
            expect(response.body.user).to.have.property('id',Registered_User)
            expect(response.body.user).to.have.property('name', UpdateNameEmail.Username)
            expect(response.body.user).to.have.property('email', UpdateNameEmail.email)
        })
    })
    
    //Password changes but message NG
    // it('200: Successfully update password of user according to their user id', () => {
    //     const UpdatePassword = generateLocalAPIInformation()
    //     cy.log(Registered_Pword)
    //     cy.wrap(Registered_User).should('exist')
    //     cy.api({
    //         method: 'PATCH',
    //         url: BASE_URL + `/${Registered_User}`,
    //         headers: {
    //             'Authorization': AUTH_TOKEN
    //         },
    //         body: {Password: UpdatePassword.password
    //         }
    //     }).then((response) => {
    //         expect(response.status).to.eq(200)
    //         expect(response.body).to.have.property('message', 'Successfully updated the password')
    //         expect(response.body.user).to.have.property('id', Registered_User)
    // })
    // })

    it('200: Successfully delete created user', () => {
        cy.wrap(Registered_User).should('exist')
        cy.api({
            method: 'DELETE',
            url: BASE_URL + `/${Registered_User}`,
            headers: {
                'Authorization': AUTH_TOKEN
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('message', 'User deleted')
        })
    })


})