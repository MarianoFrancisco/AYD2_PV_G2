describe('Pago de Tarjeta de Crédito', () => {
  before(() => {
    // Asegúrate de que el servidor de Angular esté corriendo
    cy.visit('http://localhost:4200/user/pago-tarjeta-credito');
  });

  it('debería realizar el pago de tarjeta de crédito con éxito', () => {
    // Esperar a que los campos estén visibles
    cy.get('#account_id').should('be.visible').type('2');
    cy.get('#card_number').should('be.visible').type('4000567812345678');
    cy.get('#amount').should('be.visible').type('10');
  });

});
