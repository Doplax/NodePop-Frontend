export interface User {
  _id: string;
  email: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
  user?: User;
}
