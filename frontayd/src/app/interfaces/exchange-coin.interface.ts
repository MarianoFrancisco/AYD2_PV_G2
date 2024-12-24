// src/app/interfaces/exchange-coin.interface.ts
export interface ExchangeCoinRequest {
    cui: string;
    amount: number;
  }
  
  export interface ExchangeCoinResponse {
    message: string;
    cui: string;
    amount_in_quetzales: number;
    amount_in_dollars: number;
    exchange_rate: number;
    total_exchanged_today: number;
  }
  