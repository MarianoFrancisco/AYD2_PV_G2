export interface EmployeeRequest {
    id: number;
    name: string;
    role: string;
    user_name: string;
    email: string;
    phone: string;
    age: number;
    dpi_number: string;
    complete_paperwork_path: string | null;
    photo_path: string;
    gender: string;
    estado_civil: string;
    signature_path: string | null;
    created_at: number;
  }
  