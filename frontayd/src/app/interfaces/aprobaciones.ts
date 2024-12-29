export interface Account {
    "cui": string | null,
    "name": string,
    "last_name": string,
    "phone": string,
    "email": string,
    "photo_path": string | null
}

export interface Prestamos {
    "id": number,
    "account_id": number,
    "loan_type": string,
    "requested_amount": string,
    "term": string,
    "loan_term": number,
    "requested_at": number,
    "status": string,
    "documentation_path": string,
    "account": Account
}

export interface Tarjetas {
    "id": number,
    "account_id": number,
    "card_number": string,
    "card_type": string,
    "issue_date": number,
    "expiry_date": number,
    "credit_limit": string,
    "balance": string,
    "status": string,
    "accountDetails": Account
}