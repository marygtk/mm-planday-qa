describe('Test suite for shift scenario addition',() => {

    beforeEach(function() {
        cy.fixture('example.json').as('testData')
        .get('@testData').then((testData) => {
            cy.visit(testData.baseUrl.url).cookiesPopUpDisplaying()
        })

    })

    it('Validate incorrect login inputs errors', function () {
    cy.fixture('example.json').as('testData').get('@testData')
    cy.cookiesPopUpDisplaying('@testData')
    cy.login('@testData','  ','  ')  
    })

    it('Validate successful login scenario', function () {
    cy.fixture('example.json').as('testData').get('@testData')
    cy.cookiesPopUpDisplaying('@testData')
    cy.login('@testData','plandayqa@outlook.com','APItesting21')
     })

    it('Validate scenario when user adds a new shift on the calendar for the employee one', function () {
        cy.get('@testData').navBarSchedule('@testData')
        .createShiftForFirstEmployee('@testData',3)
        .createTaskUser('Führungskräfte')
    })
    
})