export interface SecurityQuestionResponse {
    security_question: string;
    security_answer: string;
  }
  
  export interface BlockCardRequest {
    card_number: string;
    block_reason: 'Robo' | 'Pérdida' | 'Fraude';
    blocked_at: number;
  }
  
  export interface BlockCardResponse {
    message: string;
  }
  