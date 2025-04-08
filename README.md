# Training_Cypress_Repo
For personal cypress test automation testing 


# Installation
1. Create a Project Folder
  - Create a project folder in your desktop named "Cypress_Testing" 
2. Clone the Repository
    ```bash
    cd ~/Desktop/Cypress_Testing
    git clone https://github.com/MaNaMee/Training_Cypress_Repo.git
    ```
3. Install Dependencies
   ```bash
    cd Training_Cypress_Repo
    npm install
    ```
4. Install cypress
   ``` bash
   npm install cypress --save-dev
   ```
   
# Running the Tests
 - Contained in this repo is a cypress spec file (a test code/file) for the login feature of saucedemo.com. This file can be run in headed and in headless mode.

## Headed Mode
 - In headed mode, the preffered browser of the user will open with a visible UI for cypress. This mode can be useful for a visual confirmation of the test actions done by the spec file.

1. type in CMD
   ```bash
    npx cypress open
    ```
2. Once the client for cypress is open, click E2E Testing
3. Choose a preferred browser
4. Once cypress is opened in the preferred browser, click login.cy.js

## Headless mode (NO UI)

1. open package.json and modify the scripts array
``` bash
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "login-test": "npx cypress run  --spec 'cypress/e2e/login.cy.js' --browser chrome" 
  },
```
2. Save package.json
3. type in cmd
   ``` bash
   npm run login-test
   ```

