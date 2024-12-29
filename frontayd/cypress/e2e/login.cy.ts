describe('Login Test', () => {
  it('should log in successfully with valid credentials', () => {
    const baseUrl = 'http://localhost:4200';

    // Navegar al sitio
    cy.visit(`${baseUrl}/login`);

    // Ingresar el correo
    cy.get('input[formControlName="email"]').type('juanperez');

    // Ingresar la contraseña
    cy.get('input[formControlName="password"]').type('1234');

    // Hacer clic en el botón de iniciar sesión
    cy.get('button[type="submit"]').click();

    // Validar que la navegación es exitosa (por ejemplo, al dashboard)
    cy.url().should('include', '/user/dashboard');

    // O validar que aparece un mensaje de éxito
    cy.contains('Bienvenido').should('be.visible');
  });
});
