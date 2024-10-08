describe('template spec', () => {
  it('passes', () => {

    cy.on('uncaught:exception', () => false) //ignorar erro intermintente que impedia de fechar a janela

    cy.visit('/');

    cy.contains('Alerts, Frame & Windows').click();

    cy.contains('Browser Windows').click();
    
    cy.window().then((win) => {
      cy.spy(win, 'open').as('open')
    })
    
    cy.get('#windowButton').click();

    
    cy.get('@open').should('have.been.calledOnceWith', '/sample', '_blank')
    .its('firstCall.returnValue').then ((childWindow) => {

    })
    .wait(1000)
    .invoke('close');
  })
})