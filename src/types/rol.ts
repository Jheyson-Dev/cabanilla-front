export interface Rols {
  id: number;
  name: string;
  status: boolean;
  options?: string;
  roles: String;
}

export interface RolInput {
  name: string;
  status?: boolean;
}
