export interface NewAccount {
    firstName: string,
    lastName: string,
    cui: string,
    phone: string,
    email: string,
    age: number,
    gender: string,
    accountType: string,
    securityQuestion: string,
    securityAnswer: string,
    amount: number,
    photo64: string,
}

export interface UpdateCurrency {
    account_number: string,
}

export interface ResponseUpdateCurrency {
    "account_number": string | null,
    "name": string | null,
    "last_name": string | null,
    "account_type": string | null,
    "currency": string | null,
    "balance": number | null,
    "error": string | null,
}