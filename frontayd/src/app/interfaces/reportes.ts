// reportes.interface.ts
export interface ReportePrestamos {
    Account_number: string;
    loand_type: string;
    total_amount: string;
    remaining_balance: string;
    state: string;
    created_at: string;
  }
  
  export interface ReporteSolicitudes {
    cambios: Solicitud[];
    prestamos: Prestamo[];
    cancelacion: Cancelacion[];
    cards: Card[];
  }
  
  export interface Solicitud {
    name: string;
    dpi_number: string;
    type_request: string;
    created_at: string;
  }
  
  export interface Prestamo {
    name: string;
    last_name: string;
    account_number: string;
    type: string;
    type_loan: string;
    status: string;
    created_at: string;
  }
  
  export interface Cancelacion {
    name: string;
    last_name: string;
    account_number: string;
    type: string;
    type_loan: string;
    status: string;
    created_at: string;
  }
  
  export interface Card {
    name: string;
    last_name: string;
    card_number: string;
    card_type: string;
    type: string;
    status: string;
  }
  
  export interface ReporteTransacciones {
    account_number: string;
    name: string;
    last_name: string;
    pago_servicio_total: number;
    pago_prestamos_total: number;
    pago_credito_total: number;
    retiro_total: number;
    deposito_total: number;
    dinero_total_cuenta: string;
  }
  