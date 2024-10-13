describe('template spec', () => {
  it('passes', () => {
    
    cy.on('uncaught:exception', () => false) //ignorar erro intermintente

    cy.visit('/');

    cy.contains('Interactions').click();

    cy.contains('Sortable').click();

    // incompleto, feito no selenium em outro projeto
    
  })
})