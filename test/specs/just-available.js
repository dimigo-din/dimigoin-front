describe('Just visit site', function () {
  it('succesfully mounted', () => {
    cy.visit('/')
    cy.get('[data-test="app-root"]').should('exist')
  })
})
