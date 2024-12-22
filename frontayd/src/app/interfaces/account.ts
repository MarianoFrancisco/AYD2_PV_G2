export interface Transactions {
    id: number;
    transaction_type: string;
    amount: string;
    description: string;
    created_at: number; // El timestamp debe ser numérico
}

export interface AccountDetail {
    id: number;
    name: string;
    cui: string;
    email: string;
    phone: string;
    account_number: string;
    balance: string;
    created_at: number;
    update_balance_at: number;
}

export interface AccountResponse {
    message: string;
    client: AccountDetail;
    transactions: Transactions[];
}

export interface AccountsByCuiResponse {
    message: string;
    client: {
        account: AccountDetail;
        transactions: Transactions[];
    }[];
}
