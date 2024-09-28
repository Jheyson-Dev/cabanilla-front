import { Rols } from "./rol";

export interface Persons {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  email: string;
  phone: string;
  status: boolean;
  createdAt: Date;
  updateAt: Date;
  rol?: String;
  user: UserRols;
  options?: string;
}

export interface UserRols {
  roles: Roles[];
}
export interface Roles {
  rol: Rols;
}

export interface PersonInput {
  name: string;
  lastname: string;
  dni: string;
  email: string;
  phone: string;
  id_rol?: number;
}

export interface PersonAll {
  users: Persons[];
  count: number;
}
