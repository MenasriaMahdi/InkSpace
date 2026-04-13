export interface User {
  id: number;
  username: string;
  email: string;
  bio?: string | null;
  avatar?: string | null;
  role: "USER" | "ADMIN";
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
