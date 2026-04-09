import { apiFetch } from '../lib/api';
import { type Product } from '../components/products/ProductCard';

export interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const getProducts = async (page = 1, limit = 50): Promise<ProductsResponse> => {
  return apiFetch<ProductsResponse>(`/products?page=${page}&limit=${limit}`);
};
