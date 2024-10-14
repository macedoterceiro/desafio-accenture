describe('template spec', () => {
  it('passes', () => {

    cy.visit('/');
    
    cy.contains('Forms').click();
    
    cy.contains('Practice Form').click();

    // incompleto, feito no selenium em outro projeto

  })
})