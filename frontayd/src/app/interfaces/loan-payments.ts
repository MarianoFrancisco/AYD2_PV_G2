export interface Loan_Payments {
    employee_id: number;
    account_number: string;
    loan_id: number;
    amount: number;
    payment_date: string;
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

export interface Loan {
    id: number;
    account_id: number;
    loan_type: string;
    remaining_balance: string;
    interest_rate: string;
    state: string;
    created_at: number;
  }