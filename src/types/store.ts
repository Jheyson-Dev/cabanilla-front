export interface Store {
  id: number;
  nombre: string;
  encargadoId: null | number;
  ubicacion: string;
  areaId: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  options?: string;
}

export interface InputStore {
  nombre: string;
}
