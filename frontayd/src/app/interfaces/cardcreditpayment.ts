export interface PaymentRequest {
    employee_id: number;
    account_id: number;
    card_number: string;
    amount: number;
    payment_date: string;
  }
  
  export interface PaymentResponse {
    message: string;
    account_details: {
      account_number: string;
      name: string;
      last_name: string;
      account_type: string;
    };
    employee_details: {
      employeeID: number;
      employeeSignature: string;
    };
    payment_details: {
      card_number: string;
      amount: number;
      payment_date: string;
    };
  }
  