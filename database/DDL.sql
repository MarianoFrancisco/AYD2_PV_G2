-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS money_bin;
USE money_bin;
-- Tabla de cuentas (Clientes)
CREATE TABLE IF NOT EXISTS accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_number CHAR(10) UNIQUE NOT NULL,
  cui CHAR(13) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INT NOT NULL,
  gender ENUM('Masculino', 'Femenino', 'Otro') NOT NULL,
  photo_path VARCHAR(255),
  account_type ENUM('Monetario', 'Ahorro') NOT NULL,
  currency ENUM('Quetzales', 'Dólares', 'Quetzales y Dólares') NOT NULL,
  balance DECIMAL(10, 2) DEFAULT 0 CHECK (balance >= 0)
  created_at BIGINT NOT NULL,
  update_balance_at BIGINT NOT NULL,
  security_question VARCHAR(255) NOT NULL,
  security_answer VARCHAR(255) NOT NULL
);
-- Tabla de usuarios (Empleados)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role ENUM(
    'Cajero',
    'Atención al Cliente',
    'Administrador de Sistemas',
    'Supervisor'
  ) NOT NULL,
  user_name VARCHAR(15) NOT NULL UNIQUE,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  age INT NOT NULL,
  dpi_number VARCHAR(25) NOT NULL,
  complete_paperwork_path VARCHAR(255),
  photo_path VARCHAR(255),
  gender ENUM('Masculino', 'Femenino', 'Otro') NOT NULL,
  marital_status ENUM('Soltero', 'Casado', 'Divorciado', 'Viudo', 'Otro') NOT NULL,
  signature_path VARCHAR(255) NOT NULL,
  second_password_hash VARCHAR(255),
  second_password_updated_at BIGINT,
  created_at BIGINT NOT NULL
);

-- Tabla de tarjetas
CREATE TABLE IF NOT EXISTS cards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  card_number VARCHAR(16) UNIQUE NOT NULL,
  card_type ENUM('Crédito', 'Débito') NOT NULL,
  issue_date BIGINT NOT NULL,
  expiry_date BIGINT NOT NULL,
  credit_limit DECIMAL(12, 2) DEFAULT NULL,
  balance DECIMAL(12, 2) DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);
-- Tabla de bloqueos de tarjetas
CREATE TABLE IF NOT EXISTS card_blocks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  card_id INT NOT NULL,
  block_reason ENUM('Robo', 'Pérdida', 'Fraude') NOT NULL,
  blocked_at BIGINT NOT NULL,
  FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE
);
-- Tabla de préstamos
CREATE TABLE IF NOT EXISTS loans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  loan_type ENUM(
    'Personal',
    'Hipotecario',
    'Vehicular',
    'Educativo'
  ) NOT NULL,
  total_amount DECIMAL(12, 2) NOT NULL,
  remaining_balance DECIMAL(12, 2) NOT NULL,
  interest_rate DECIMAL(5, 2) NOT NULL,
  state ENUM('Sin Pagar', 'Parcialmente Pagado', 'Pagado') NOT NULL,
  created_at BIGINT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);
-- Tabla de pagos de servicios
CREATE TABLE IF NOT EXISTS service_payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_type ENUM('Agua', 'Luz', 'Teléfono', 'Internet') NOT NULL,
  service_code VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  created_at BIGINT NOT NULL
);
-- Tabla de depósitos
CREATE TABLE IF NOT EXISTS deposits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  account_type ENUM('Monetaria', 'Ahorro') NOT NULL,
  currency ENUM('Quetzales', 'Dólares') NOT NULL,
  created_at BIGINT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);
-- Tabla de retiros
CREATE TABLE IF NOT EXISTS withdrawals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  account_type ENUM('Monetaria', 'Ahorro') NOT NULL,
  currency ENUM('Quetzales', 'Dólares') NOT NULL,
  created_at BIGINT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);
-- Tabla de historial de transacciones
CREATE TABLE IF NOT EXISTS transaction_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  transaction_type ENUM(
    'Depósito',
    'Retiro',
    'Pago de Servicio',
    'Pago de Préstamo',
    'Cambio de Moneda',
    'Pago crédito'
  ) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description VARCHAR(255),
  created_at BIGINT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);
-- Tabla de cambio de moneda
CREATE TABLE IF NOT EXISTS currency_exchanges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  exchanged_at BIGINT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);
-- Tabla de solicitudes de cancelación de servicios
CREATE TABLE IF NOT EXISTS service_cancellations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  service ENUM('Cuenta', 'Tarjeta') NOT NULL,
  reason TEXT NOT NULL,
  status ENUM('Pendiente', 'Procesada', 'Rechazada') NOT NULL,
  created_at BIGINT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);
-- Tabla de quejas de clientes
CREATE TABLE IF NOT EXISTS complaints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  category ENUM('Servicio', 'Producto', 'Atención al Cliente') NOT NULL,
  details TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);
-- Tabla de encuestas de satisfacción
CREATE TABLE IF NOT EXISTS surveys (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT,
  category ENUM('Atención al Cliente', 'Servicios', 'Productos') NOT NULL,
  score INT NOT NULL,
  comment TEXT,
  responded_at BIGINT NOT NULL,
  Question1 TEXT,
  Answer1 TEXT,
  Question2 TEXT,
  Answer2 TEXT,
  Question3 TEXT,
  Answer3 TEXT,
  Question4 TEXT,
  Answer4 TEXT,
  Question5 TEXT,
  Answer5 TEXT,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);
-- Tabla de auditorías
CREATE TABLE IF NOT EXISTS activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  activity_type ENUM(
    'Login',
    'Registro',
    'Transacción',
    'Cambio de Datos',
    'Bloqueo de Tarjeta',
    'Cambio de Moneda'
  ) NOT NULL,
  description TEXT,
  created_at BIGINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Tabla de actualizaciones de cuentas
CREATE TABLE IF NOT EXISTS account_updates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  field_name VARCHAR(50) NOT NULL,
  old_value TEXT,
  new_value TEXT,
  updated_at BIGINT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);


-- Tabla de solicitudes de préstamos
CREATE TABLE IF NOT EXISTS request_loan (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único
  account_id INT NOT NULL, -- Relación con la tabla de cuentas
  loan_type ENUM('Personal', 'Hipotecario', 'Vehicular', 'Educativo') NOT NULL, -- Tipo de préstamo
  requested_amount DECIMAL(12, 2) NOT NULL, -- Monto solicitado
  loan_term INT NOT NULL, -- Plazo del préstamo (en meses o años, según definas)
  requested_at BIGINT NOT NULL, -- Fecha y hora en formato timestamp
  status ENUM('Pendiente', 'Aprobada', 'Rechazada') NOT NULL, -- Estado de la solicitud
  documentation_path VARCHAR(255), -- Link donde se subirá el archivo PDF
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE -- Relación con la tabla accounts
);

-- Tabla de solicitudes de modificacion informacion y contraseña
CREATE TABLE IF NOT EXISTS request_change_info (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único
  account_id INT NOT NULL, -- Relación con la tabla de cuentas
  type ENUM("Informacion", "Password") NOT NULL
);