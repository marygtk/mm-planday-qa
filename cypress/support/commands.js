

Cypress.Commands.add('navBarSchedule', (alias) =>{
    cy.get(alias).then((testData) => {
        cy.get(testData.scheduleObjects.nav,{timeout:4000}).should('exist')
        cy.visit('https://test1234.planday.com/page/schedule')
        cy.url({timeout:8000}).should('include','/page/schedule').reload()
    })
})


Cypress.Commands.add('createEmployee', (alias, name,lastName,employeeEmail, taxCode, date, addressStreet, zip, city,large) => {
    cy.get(alias).then((testData) => {
        cy.get(testData.peopleObjects.createEmployeeButton,{timeout:10000}).click()
        .get(testData.peopleObjects.employeeName,{timeout:5000}).type(name)
        .get(testData.peopleObjects.employeeLastName,{timeout:5000}).type(lastName)
        .get(testData.peopleObjects.employeeEmail,{timeout:5000}).type(employeeEmail)
        .get(testData.peopleObjects.calendarInputId).type(date)
        .get(testData.peopleObjects.taxCode).type(taxCode)
        .get(testData.peopleObjects.addressId).type(addressStreet)
        .get(testData.peopleObjects.zipCode).type(zip)
        .get(testData.peopleObjects.cityId).type(city)
        .get(testData.peopleObjects.saveForm).click().get('.sc-uJMKN > .styled__StyledButton-sc-ygpd71-0',{timeout:8000}).click()
        .reload().wait(4000)
        .get(testData.peopleObjects.employeesCount,{timeout:7000}).should('exist')
        .get(`span:contains(${name} ${lastName})`,{timeout:7000}).should('exist')

    })
})

Cypress.Commands.add('navBarPeople', (alias) =>{
    cy.get(alias).then((testData) => {
        cy.get(testData.peopleObjects.nav,{timeout:4000}).click()
        cy.url({timeout:8000}).should('include','/employees#/people').reload()
    })
})

Cypress.Commands.add('checkGridEmployees', (alias,number) =>{
    cy.get(alias).then((testData) => {
        cy.get(testData.scheduleObjects.grid,{timeout:7000}).then((el) => {
            let amountOfEmployees = el - 1;
            el.should('exist')
            if (el > 0){
                expect(amountOfEmployees).to.equal(number)
            }
        })
        cy.get(testData.scheduleObjects.nextWeekArrow).click()
    })
})

Cypress.Commands.add('createShiftForFirstEmployee', (message) => {
    //esto es para crear una shift en el empleadi 1
cy.get(testData.scheduleObjects.grid,{timeout:7000}).children().eq(1).children().eq(1).find('div').click()
    .get(testData.scheduleObjects.shiftForm,{timeout:7000}).within(() => {
        cy.get(testData.scheduleObjects.intervalDates).click().get(testData.scheduleObjects.dates,{timeout:7000}).click()
    })
cy.get(testData.scheduleObjects.submitShiftForm).click()
cy.get(testData.scheduleObjects.grid,{timeout:7000})
.children().eq(1).children().eq(1).find('div > div > div > span > span').should('have.tex', message)
})

Cypress.Commands.add('logOut', () =>{
    cy.visit('/signout')
})

Cypress.Commands.add('cookiesPopUpDisplaying', () =>{
    cy.get('@testData').then((testData) => {
        cy.wait(4000).get('body').then(($body)=> {
            if ($body.find(testData.baseUrl.bannerDiv,{timeout: 5000}).length > 0) {
                cy.get(testData.baseUrl.bannerDiv,{timeout: 5000})
                .within(()=>{
                    cy.get(testData.baseUrl.cookieBtn).click({force:true})
                })

            }
        })
    })
})

Cypress.Commands.add('login', (alias, username, password) => {
    cy.get(alias).then((testData) => {
    cy.get(testData.loginObjects.formDiv,{timeout:5000}).should('exist')
    cy.get(testData.loginObjects.username).should('exist')
    cy.get(testData.loginObjects.password).should('exist')
    cy.get(testData.loginObjects.showIcon).should('exist')
    cy.get(testData.loginObjects.submitLogin).should('exist')
    cy.get(testData.loginObjects.forgotPassword).should('exist')
    cy.get(testData.loginObjects.username).type(username)
    cy.get(testData.loginObjects.password).type(password)
    cy.get(testData.loginObjects.submitLogin).click({force:true}).wait(500)
    cy.get('body').then((body) =>{
        if(body.find(testData.loginObjects.errorUsername).length > 0){
            cy.url({timeout:10000})
            cy.get(testData.loginObjects.errorUsername,{timeout: 5000})
                .contains('The username or password is incorrect.').should('exist')
                .get(testData.loginObjects.passwordError,{timeout: 5000})
                .contains('The username or password is incorrect.').should('exist')
            } else {
                cy.get('.bkFHwb > .sc-gKclnd',{timeout:10000}).should('exist').url().should('include', '/page/home')                
            }
        })
    })
})