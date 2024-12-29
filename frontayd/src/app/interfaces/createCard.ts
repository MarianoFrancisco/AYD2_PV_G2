export interface Card {
    id: number;
    account_id: number;
    card_number: string;
    card_type: 'Débito' | 'Crédito';
    issue_date: number;
    expiry_date: number;
    credit_limit: number;
    balance: string;
    status: 'Pendiente' | 'Aprobada' | 'Rechazada';
  }
  
  export interface CreateCardResponse {
    message: string;
    card: Card;
  }
  