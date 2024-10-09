describe('template spec', () => {
  it('passes', () => {

    cy.on('uncaught:exception', () => false) //ignorar erro intermintente

    cy.visit('/');

    cy.contains('Widgets').click();

    cy.contains('Progress Bar').click();

    cy.get('#startStopButton').click().then(() => {
      cy.wait(2200)
      cy.get('#startStopButton').click();
    });

    cy.get('#progressBar').find('.progress-bar').invoke('attr', 'aria-valuenow').then(parseInt).should('be.lessThan', 25);
    cy.wait(500)

    cy.get('#startStopButton').click().then(() => {
      cy.wait(8800)
      cy.get('#resetButton').click();
    });

  })
})