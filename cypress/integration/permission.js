describe('Annonymous Accessability', () => {
  it('Cannot visit main page', () => {
    cy.visit('/')
    cy.url().should('eq', Cypress.config().baseUrl + '/auth/login')
  })

  it('Cannot visit the other pages', () => {
    cy.visit('/asdf')
    cy.url().should('eq', Cypress.config().baseUrl + '/auth/login')
  })
})
