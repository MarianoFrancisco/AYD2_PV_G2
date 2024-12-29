describe('Test de búsqueda por Cuenta o CUI', () => {
  const baseUrl = 'http://localhost:4200/user/cuenta';

  beforeEach(() => {
    // Navegar al sitio de búsqueda
    cy.visit(baseUrl);
  });

  it('Debería buscar por cuenta correctamente', () => {
    cy.get('select[formControlName="tipoBusqueda"]').select('account_number');
    cy.get('input[formControlName="codigoBusqueda"]').type('1000000001');

    cy.get('button[type="submit"]').click();
    cy.get('table tbody tr').should('exist');
  });

  it('Debería buscar por CUI correctamente', () => {
    cy.get('select[formControlName="tipoBusqueda"]').select('cui');
    cy.get('input[formControlName="codigoBusqueda"]').type('1234567890123');
    cy.get('button[type="submit"]').click();
    cy.get('table tbody tr').should('exist');
  });

  it('Debería limpiar los campos correctamente', () => {
    cy.get('input[formControlName="codigoBusqueda"]').type('1234567890123');
    cy.get('button').contains('Limpiar').click();
    cy.get('input[formControlName="codigoBusqueda"]').should('have.value', '');
  });
});
