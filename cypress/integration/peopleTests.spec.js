describe('Employee test Suite', () => {
    let currentTimeStamp = Date.now();
    let employee = `employee${currentTimeStamp}`
    let lastname = `lastname${currentTimeStamp}`
    let email = `${currentTimeStamp}@gmail.com`

    beforeEach(function (){
        cy.fixture('example.json').as('testData')
        .get('@testData').then((testData) => {
            cy.visit(testData.baseUrl.url)
            cy.cookiesPopUpDisplaying('@testData')
            cy.login('@testData','plandayqa@outlook.com','APItesting21')
        })
    })

    it('add a new employee and validate that employee shows on the list', function () {
            cy.get('@testData')
            cy.visit("https://test1234.planday.com").navBarPeople('@testData')
            cy.createEmployee('@testData',employee, lastname, email,'1234','12/11/1995', 'Bulnes 1654', 1254, 'Buenos Aires',6)
        

    })

})