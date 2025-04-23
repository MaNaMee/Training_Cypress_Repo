let petID, OrderID,Username, pword;
let createdPets = [];

describe('Pet Store API Store and User testing', () => {

    const pet1 = {
        id:123,
        name: 'Tralalelo',
        status: 'Available'
    }

    const pet2 = {
        id:1234,
        name: 'crocodilo',
        status: 'available'
    }

    const pet3 = {
        id:12345,
        name: 'picodillo',
        status: 'sold'
    }

    const SingleUser = {
        id:2003,
        username: 'SingleUser1',
        firstName: 'Single',
        lastName: 'User1',
        email: 'SingleUser1@mail.com',
        password: '123456qwerty',
        phone: '102938474',
        userStatus: 1
    }

    const UpdateSingleUser = {
        id:2003,
        username: 'UpdatedSingleUser1',
        firstName: 'UpdatedSingle',
        lastName: 'User1',
        email: 'UpdatedSingleUser1@mail.com',
        password: 'qwerty1234',
        phone: '10293344',
        userStatus: 1
    }

    const UserArray =  [
        {
          id: 2001,
          username: 'listUser1',
          firstName: 'List',
          lastName: 'User1',
          email: 'listuser1@example.com',
          password: 'password123',
          phone: '1234567890',
          userStatus: 1
        },
        {
          id: 2002,
          username: 'listUser2',
          firstName: 'List',
          lastName: 'User2',
          email: 'listuser2@example.com',
          password: 'password123',
          phone: '0987654321',
          userStatus: 1
        }
      ];

    const order1 = {
        id: 300001,
        petId: 1234,
        quantity: 2,
        shipDate: new Date().toISOString(),
        status: 'placed',
        complete: true
    }

    //create a pet for storing and ordering
    before(() => {
        cy.api({
            method: 'POST',
            url: '/pet',
            body: pet1,
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id', pet1.id)
        })

       
    })

    //Store Testing
    it('GET: Let user check pet inventory', () => {
       // cy.wrap(createdPets).should('exist');
        cy.api({
            method: 'GET',
            url: '/store/inventory',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object')
        })
    })

    it('POST: Let user order from the store', () => {
        cy.api({
            method: 'POST',
            url: '/store/order',
            body: order1
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id', order1.id)
            OrderID = response.body.id
        })
    })
    
    it('GET: Let the user find purchase order by ID', () => {
        cy.wait(2500)
        cy.wrap(OrderID).should('exist')
        cy.api({
            method: 'GET',
            url: `/store/order/${OrderID}`,
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id',order1.id)
        })
    })

    it('DELETE: Let the user delete a purchase order by id', () => {
        cy.wrap(OrderID).should('exist')
        cy.api({
            method: 'DELETE',
            url: `/store/order/${OrderID}`,
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    //USERS ENDPOINT

    it('POST: Let user create a single user', () => {
        cy.api({
            method: 'POST',
            url: '/user',
            body: SingleUser
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.include(SingleUser.id)
        })
    })

    it('POST: Let user create multiple users with given array', () => {
      cy.api({
        method: 'POST',
        url: '/user/createWithList',
        body: UserArray
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    it('GET: Let user search for a specific user via username', () => {
        cy.api({
            method: 'GET',
            url: `/user/${SingleUser.username}`
        }).then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id', SingleUser.id)
            expect(response.body).to.have.property('username', SingleUser.username)
            Username = response.body.username
        })
    })

    it('PUT: Let current user update a specific user', () => {
        cy.wrap(Username).should('exist')
        cy.api({
            method: 'PUT',
            url: `/user/${Username}`,
            body: UpdateSingleUser
        }).then((response) => {
            expect(response.status).to.eq(200)
            cy.log("Record is updated")
            Username = UpdateSingleUser.username
        })
    })

    it('Verify if user details is updated', ()  => {
        cy.api({
            method: 'GET',
            url: `/user/${Username}`
        }).then((response)  => {
            expect(response.status).to.eq(200)
            if (response.body.username === SingleUser.username) {
                throw new Error('Record not updated')
            } else{
                cy.log("Record is updated")
            }
            Username = UpdateSingleUser.username
            pword = UpdateSingleUser.password
        })
    })

    it('GET: Let created user to login', () => {
        cy.wrap(Username).should('exist')
        cy.api({
            method: 'GET',
            url: '/user/login',
            body: {
                username: Username,
                password: pword
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('message')
        })
    })

    it('GET: Let user logout', () => {
        cy.wrap(Username).should('exist')

        //login to created user
        cy.api({
            method: 'GET',
            url: '/user/login',
            body: {
                username: Username,
                password: pword
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('message')
        })

        //logout of created user
        cy.api({
            method: 'GET',
            url: '/user/logout'
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('DELETE: Delete created user', () => {
        cy.wrap(Username).should('exist')
        //Login to created user
        cy.api({
            method: 'GET',
            url: '/user/login',
            body: {
                username: Username,
                password: pword
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.include('logged in user')
        })
        
        //Delete logged in user
        cy.api({
            method: 'DELETE',
            url: `/user/${Username}`
        }).then((response) => {
            expect(response.status).to.eq(200)
            if (response.body.message && response.body.message.includes(Username)) {
                cy.log('User has been deleted')
                return true
            }else{
                throw new Error("User not deleted");
            }
        })
    })



})