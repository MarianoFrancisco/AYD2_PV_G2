describe('Pago por Cuenta - Registro de Pago', () => {
  it('Debería registrar el pago con éxito', () => {
    cy.visit('http://localhost:4200/user/pagos');
    cy.wait(1000);
    cy.get('select#paymentType').select('service');
    cy.get('select#tipoPago').select('agua');
    cy.get('input#codigoServicio').type('67890');
    cy.get('input#montoPagar').type('100');
    cy.get('input#numeroCuenta').type('1000000001');
    cy.get('input#dpi').type('1234567890123');

    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('El pago ha sido registrado exitosamente.');
    });

    cy.url().should('include', '/user/pagos');
  });
});
