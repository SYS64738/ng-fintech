export interface User {
  email: string;
  name: string;
  surname: string;
  password: string;
}

export type Credentials = Pick<User, 'email' | 'password'>;
