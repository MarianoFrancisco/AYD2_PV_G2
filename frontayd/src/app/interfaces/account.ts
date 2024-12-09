export interface Accounts {
    tipo: string,
    codigo: string
}

export interface Transactions{
    id: number,
    transaction_type: string,
    amount: string ,
    description: string,
    created_at: string
}

export interface AccountDetail{
    id: number,
    user_id: number,
    account_number: string,
    balance: string,
}

export interface UserDetail{
    id: number,
    name: string,
    cui: string,
    email: string,
    phone: string,
    account: AccountDetail
}