export interface Payments {
    service_name: string;
    service_code: number;
    amount: number;
    cui: string;
    pin: string;
}

export interface ResponsePayments{
    id: number,
    account_id:number,
    user_id: number,
    service_type: string,
    service_code: string,
    amount: number,
    created_at: string
}

export interface VoucherPayments{
    account_number: string,
    name: string,
    signature: string
}