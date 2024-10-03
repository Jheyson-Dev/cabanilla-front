import { Product } from "./product";
import { Store } from "./store";

type MovementType = "IN" | "OUT" | "TRANSFER";

export interface kardex {
  id: number;
  productId: number;
  originStoreId: number | null;
  destinationStoreId: number;
  quantity: number;
  movementType: MovementType;
  movementDate: Date;
  product: Product;
  destinationStore: Store;
  originStore?: Store | null;
  options?: string;
}

export interface InputKardex {
  productId: number;
  originStoreId?: number | null;
  destinationStoreId: number;
  quantity: number;
  movementType: MovementType;
  movementDate: Date;
}
