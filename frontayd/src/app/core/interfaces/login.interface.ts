export interface LoginResponse {
    requiresTwoFactor: boolean;
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  }