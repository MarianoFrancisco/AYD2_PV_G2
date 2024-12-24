export interface ComplaintsRegister {
    identificacion: string,
    detalle: string,
    tipoQueja: string,
}

export interface ComplaintsRegisterResponse {
    accountNumber: string,
    creationDate: number,
    message: string,
}