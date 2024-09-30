export interface Supplier {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  status: boolean;
  options?: string;
}
export interface SupplierInput {
  name: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
}
