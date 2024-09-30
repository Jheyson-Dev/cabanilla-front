import { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantityAvailable: number;
  categoryId: number;
  supplierId: number;
  status: boolean;
  category: Category;
  options?: string;
}
