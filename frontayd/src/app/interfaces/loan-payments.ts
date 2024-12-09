export interface Loan_Payments {
    loan_number: string,
    amount:string,
    cui:string,
    pin:string
}

export interface Payment {
    created_at: string,
    id: number,
    loan_id: number,
    account_id: number,
    amount: string
}

export interface Loan_state {
    loanState: string,
}