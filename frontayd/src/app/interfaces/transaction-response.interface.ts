export interface RetiroResponse {
    message: string;
    voucher: {
      account_number: string;
      name: string;
      signature: string;
    };
    transaction: {
      id: number;
      account_number: string;
      transaction_type: string;
      amount: number;
      account_type: string;
      currency: string;
      description: string;
      created_at: number;
    };
  }
  