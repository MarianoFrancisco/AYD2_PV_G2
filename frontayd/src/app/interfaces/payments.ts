export interface Payments {
    id: string;
    accountNumber: string;
    dpi: string;
    serviceName: string;
    serviceCode: string;
    amount: number;
    paymentType: 'service' | 'cash'; // nuevo campo para el tipo de pago
  }
  
  export interface ResponsePayments {
    id: number;
    service_type: string;
    service_code: string;
    amount: number;
    created_at: string;
  }
  
  export interface VoucherPayments {
    account_number: string;
    name: string;
    signature: string;
  }
  