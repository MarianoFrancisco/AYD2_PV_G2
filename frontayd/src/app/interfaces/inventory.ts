export interface Entry {
  id: number;
  account_id: number;
  transaction_type: string;
  amount: string;
  description: string;
  created_at: any;
}

export interface WithdrawalTransaction {
  id: number;
  account_id: number;
  transaction_type: string;
  amount: string;
  description: string;
  created_at: any;
}

export interface Loan {
  id: number;
  account_id: number;
  loan_type: string;
  total_amount: string;
  remaining_balance: string;
  state: string;
  created_at: any;
}

export interface Exits {
  transacciones: WithdrawalTransaction[];
  prestamos: Loan[];
}

export interface Inventory {
  entradas: Entry[];
  salidas: Exits;
}

export interface CapitalTotal {
  Capital_Total: number;
}
