export interface Admins {
    "id": number,
    "name": string,
    "role": string,
    "user_name": string,
    "email": string,
    "password": string,
    "phone": string,
    "age": number,
    "dpi_number": string,
    "complete_paperwork_path": string,
    "photo_path": string,
    "gender": string,
    "marital_status": string,
    "signature_path": string,
    "second_password_hash": string,
    "second_password_updated_at": number,
    "created_at": number
}

export interface Employees {
    "id": number,
    "name": string,
    "solicitud": string,
    "password": string,
    "path_solicitud": string,
    "created_at": number
}

  