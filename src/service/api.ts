import { graphqlClient } from "@/graphqlClient";
import { Supplier, Category, Rols, Product, kardex } from "@/types";
import { Area } from "@/types/area";
import { PersonAll, Persons } from "@/types/person";
import { Store } from "@/types/store";
import { Users } from "@/types/user";

// PETICIONES DE LOS DATOS DE USUARIOS
export const getUsersApi = async (query: any): Promise<Users[]> => {
  const response: { getAllUsers: Users[] } = await graphqlClient.request(query);
  console.log(JSON.stringify(graphqlClient));
  const { getAllUsers } = response;
  return getAllUsers;
};

export const getPersonsApi = async (query: any): Promise<PersonAll> => {
  const response: { getAllPersons: PersonAll } = await graphqlClient.request(
    query
  );
  const { getAllPersons } = response;
  return getAllPersons;
};

export const getPersonByIdApi = async (query: any) => {
  const response: { getPersonById: Persons } = await graphqlClient.request(
    query
  );
  const { getPersonById } = response;
  return getPersonById;
};

export const getRolsApi = async (query: any): Promise<Rols[]> => {
  const response: { getAllRols: Rols[] } = await graphqlClient.request(query);
  const { getAllRols } = response;
  return getAllRols;
};

export const getRolByIdApi = async (query: any): Promise<Rols> => {
  const response: { getRolById: Rols } = await graphqlClient.request(query);

  const { getRolById } = response;
  return getRolById;
};

// PETICIONES DE LOS DATOS DE CATEGORY
export const getCategoriesApi = async (query: any): Promise<Category[]> => {
  const response: { getAllCategories: Category[] } =
    await graphqlClient.request(query);
  const { getAllCategories } = response;
  return getAllCategories;
};

export const getCategoryByIdApi = async (query: any): Promise<Category> => {
  const response: { getCategoryById: Category } = await graphqlClient.request(
    query
  );
  const { getCategoryById } = response;
  return getCategoryById;
};

// PETICIONES DE LOS DATOS DE SUPPLIER

export const getSuppliersApi = async (query: any): Promise<Supplier[]> => {
  const response: { getAllSuppliers: Supplier[] } = await graphqlClient.request(
    query
  );
  const { getAllSuppliers } = response;
  return getAllSuppliers;
};

export const getSupplierByIdApi = async (query: any): Promise<Supplier> => {
  const response: { getSupplierById: Supplier } = await graphqlClient.request(
    query
  );
  const { getSupplierById } = response;
  return getSupplierById;
};

// PETICIONES DE LOS DATOS DE PRODUCTO

export const getProductsApi = async (query: any): Promise<Product[]> => {
  const response: { getAllProducts: Product[] } = await graphqlClient.request(
    query
  );
  const { getAllProducts } = response;
  return getAllProducts;
};

export const getProductByIdApi = async (query: any): Promise<Product> => {
  const response: { getProductById: Product } = await graphqlClient.request(
    query
  );
  const { getProductById } = response;
  return getProductById;
};

// PETICIONES DE LOS DATOS DE AREA
export const getAreasApi = async (query: any): Promise<Area[]> => {
  const response: { getAllAreas: Area[] } = await graphqlClient.request(query);
  const { getAllAreas } = response;
  return getAllAreas;
};

export const getAreaByIdApi = async (query: any): Promise<Area> => {
  const response: { getAreaById: Area } = await graphqlClient.request(query);

  const { getAreaById } = response;
  return getAreaById;
};

//  PETICIONES DE LOS DATOS DE KARDEX
export const getKardexApi = async (query: any): Promise<kardex[]> => {
  const response: { getAllInventoryMovements: kardex[] } =
    await graphqlClient.request(query);

  const { getAllInventoryMovements } = response;
  return getAllInventoryMovements;
};

// PETICIONES DE LOS DATOS DE STORE
export const getStoresApi = async (query: any): Promise<Store[]> => {
  const response: { getAllStores: Store[] } = await graphqlClient.request(
    query
  );
  const { getAllStores } = response;

  return getAllStores;
};

export const getStoreByIdApi = async (query: any): Promise<Store> => {
  const response: { getStoreById: Store } = await graphqlClient.request(query);
  const { getStoreById } = response;

  return getStoreById;
};
