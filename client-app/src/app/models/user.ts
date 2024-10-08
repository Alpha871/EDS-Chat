export interface User {
  username: string;
  firstname: string;
  lastname: string;
  token: string;
  image?: string;
  role: string;
}

export interface UserFormValues {
  username?: string;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
}
