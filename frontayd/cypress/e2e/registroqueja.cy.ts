describe('Registrar Queja - Test', () => {
  it('Debe registrar una queja con éxito', () => {
    // Paso 1: Visitar la página de registro de queja
    cy.visit('http://localhost:4200/customer/registrar-queja');
    
    cy.get('input#identificacion').type('3045905330115');
    cy.get('select#tipoQueja').select('Servicio');
    cy.get('input#detalle').type('Mal servicio');
    
    cy.get('button[type="submit"]').click();
    
    cy.get('.swal2-title').should('contain', 'Registro de Queja');
    cy.get('.swal2-html-container').should('contain', 'Queja registrada exitosamente');
    
    cy.get('input#identificacion').should('have.value', '');
    cy.get('input#detalle').should('have.value', '');
  });

  it('Debe mostrar un error si los datos no son completos', () => {
    cy.visit('http://localhost:4200/customer/registrar-queja');
    cy.get('input#identificacion').type('3045905330115');
    cy.get('button[type="submit"]').click();
    cy.get('.swal2-title').should('contain', 'Error');
    cy.get('.swal2-html-container').should('contain', 'No has ingresado todos los datos');
  });
});

