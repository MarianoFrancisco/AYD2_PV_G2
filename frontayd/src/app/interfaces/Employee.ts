export interface EmployeeRequest {
  id: number;
  name: string;
  role: string;
  user_name: string;
  email: string;
  phone: string;
  age: number;
  dpi_number: string;
  photo_path: string;
  gender: string;
  marital_status: 'Soltero' | 'Casado' | 'Divorciado' | 'Viudo' | 'Otro';
}

export interface UpdateEmployeeResponse {
  message: string;
  user: EmployeeRequest;
}