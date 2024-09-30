export interface Area {
  id: number;
  name: string;
  responsableId: any;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  options?: string;
}

export interface InputArea {
  name: string;
  responsableId?: number;
  status?: boolean;
}
