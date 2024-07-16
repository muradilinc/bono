export interface User {
  _id: string;
  email: string;
  token: string;
}

export interface ValidationError {
  error: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface GlobalError {
  error: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}
