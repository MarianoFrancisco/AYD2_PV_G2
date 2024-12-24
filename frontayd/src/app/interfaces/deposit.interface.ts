export interface DepositRequest {
    account_number: string;
    amount: number;
    account_type: string;
    currency: string;
    allow_dollar_deposit: boolean;
    user_id: number;
  }
  