import { Category } from "./category";
import { Store } from "./store";

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
  // stores?: Store[];
}
