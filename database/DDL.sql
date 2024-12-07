CREATE DATABASE IF NOT EXISTS money_bin;
USE money_bin;
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  rol ENUM('Encargado', 'Cliente') NOT NULL,
  cui CHAR(13) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(15),
  pin CHAR(6)
);
CREATE TABLE IF NOT EXISTS accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  account_number CHAR(10) UNIQUE NOT NULL,
  balance DECIMAL(10, 2) DEFAULT 0 CHECK (balance >= 0),
  created_at BIGINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS service_payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  user_id INT NOT NULL,
  service_type ENUM('Agua', 'Luz', 'Teléfono', 'Internet') NOT NULL,
  service_code VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  created_at BIGINT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS loans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  account_id INT NOT NULL,
  total_amount DECIMAL(12, 2) NOT NULL,
  remaining_balance DECIMAL(12, 2) NOT NULL,
  created_at BIGINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS loan_payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  loan_id INT NOT NULL,
  account_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  created_at BIGINT NOT NULL,
  FOREIGN KEY (loan_id) REFERENCES loans(id) ON DELETE CASCADE,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS withdrawals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  withdrawal_type ENUM('Ventanilla', 'Cajero Automatico') NOT NULL,
  created_at BIGINT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS deposits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  deposit_type ENUM('Efectivo', 'Transferencia Bancaria') NOT NULL,
  created_at BIGINT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);