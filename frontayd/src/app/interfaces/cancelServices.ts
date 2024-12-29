export interface CancelServices {
    service: string;
    reason: string;
    account_id: string;
}

export interface ViewServicesCancel {
    "id": number,
    "account_id": number,
    "service": string,
    "reason": string,
    "status": string,
    "created_at": number,
    "account_number": string,
    "cui": string,
    "name": string,
    "last_name": string,
    "phone": string,
    "email": string
}