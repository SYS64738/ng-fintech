
/*
export interface User {
  email: string;
  name: string;
  surname: string;
  password: string;
}

export type Credentials = Pick<User, 'email' | 'password'>;
*/

export interface User {
  email: string;
  displayName: string;
  picture?: string;
}

export interface Credentials {
  email: string;
  password: string;
  name: string;
  surname: string;
}

