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

export interface ProductData {
  name: string;
  sku: string;
  description?: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
}

export const getProducts = async (page = 1, limit = 50, search?: string, category?: string, status?: string): Promise<ProductsResponse> => {
  let url = `/products?page=${page}&limit=${limit}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  if (category) url += `&category=${encodeURIComponent(category)}`;
  if (status) url += `&status=${encodeURIComponent(status)}`;
  
  const response = await apiFetch<{ success: boolean, data: ProductsResponse }>(url);
  return response.data;
};

export const createProduct = async (productData: ProductData): Promise<Product> => {
  const response = await apiFetch<{ success: boolean, data: Product }>('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
  return response.data;
};

export const updateProduct = async (id: number, productData: Partial<ProductData>): Promise<Product> => {
  const response = await apiFetch<{ success: boolean, data: Product }>(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
  return response.data;
};

export const toggleProductStatus = async (id: number, isActive: boolean): Promise<Product> => {
  const response = await apiFetch<{ success: boolean, data: Product }>(`/products/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive }),
  });
  return response.data;
};
