import { faker } from '@faker-js/faker';

export function generateCustomerData() {

   const randomNumber = faker.string.numeric(2);
   const usernameBase = faker.internet.username();
   const username = `${usernameBase}${randomNumber}`;
  // username : usernameBase + randomNumber;
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(), // pwedeng custom test data yung phone number
    ssn: faker.string.numeric(9),
    //username: faker.internet.username(),
    username: username,
    password: `pword${Math.floor(Math.random() * 10000)}`,
  };
}


export function generateCustomerInformation(){

    const allowedCountries = ['India','United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore']
    const country = faker.helpers.arrayElement(allowedCountries);
    const RandomYear = faker.number.int({min: 1900, max: 2021})
    const expiryDate = faker.date.future()
    
    return {
     username : faker.person.fullName(),
     email: faker.internet.email(),
     fname : faker.person.firstName(),
     lname : faker.person.lastName(),
     password : faker.internet.password(),
     address : faker.location.streetAddress(),
     address2 : faker.location.secondaryAddress(),
     days: faker.number.int({ min:1, max: 31}),
     month : faker.date.month(),
     //month: faker.number.int({ min:1, max: 12}),
     //month_int: faker.number.int({ min:1, max: 12}),
     year : RandomYear.toString(),
     random_country : country,
     state : faker.location.state(),
     city : faker.location.city(),
     zipcode : faker.location.zipCode(),
     mobile_number : faker.phone.number(),
     expiryDate : faker.date.future(),
     cc_number : faker.finance.creditCardNumber(),
     cc_cvv : faker.finance.creditCardCVV(),
     cc_exp_month : String(expiryDate.getMonth() + 1).padStart(2, '0'),
     cc_exp_year : expiryDate.getFullYear()
    };

}