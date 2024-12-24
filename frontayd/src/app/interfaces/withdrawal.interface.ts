export interface WithdrawalRequest {
    account_number: string;
    amount: number;
    account_type: string; // Puede ser "Monetaria", etc.
    currency: string; // "Quetzales" o "Dólares"
    user_id: number;
  }
  
  export interface WithdrawalResponse {
    message: string;
    voucher: {
      account_number: string;
      name: string;
      signature: string;
    };
    transaction: {
      id: number;
      account_number: string;
      transaction_type: string; // "Retiro"
      amount: number;
      account_type: string;
      currency: string;
      description: string;
      created_at: number;
    };
  }
  