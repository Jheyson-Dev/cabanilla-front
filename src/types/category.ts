import { Product } from "./product";

export interface AllCategories {
  getAllCategories: Category[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  options?: string;
  product?: Product[];
}

export interface categoryInput {
  name: string;
  description: string;
  status?: boolean;
}
