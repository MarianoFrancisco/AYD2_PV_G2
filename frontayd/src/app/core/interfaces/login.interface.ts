export interface LoginResponse {
  requiresTwoFactor?: boolean;
  message?: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export interface usuario {
  identifier: string;
}
