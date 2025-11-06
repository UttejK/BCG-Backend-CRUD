import { useCallback, useEffect, useState } from "react";
import { productClient } from "@/api/productClient";
import type { Product } from "@/lib/types";
import type { AxiosError } from "axios";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await productClient.getProducts();
      setProducts(res.data);
      setError(null);
    } catch (err) {
      setError((err as AxiosError).message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = async (data: Product) => {
    setLoading(true);
    try {
      await productClient.createProduct(data);
      await fetchProducts(); // refresh
      setError(null);
    } catch (err) {
      setError((err as AxiosError).message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: number, data: Product) => {
    try {
      setLoading(true);
      await productClient.updateProduct(id, data);
      await fetchProducts();
      setError(null);
    } catch (err) {
      setError((err as AxiosError).message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const patchProduct = async (id: number, data: Partial<Product>) => {
    setLoading(true);
    try {
      await productClient.patchProduct(id, data);
      await fetchProducts();
      setError(null);
    } catch (err) {
      setError((err as AxiosError).message || "Failed to patch product");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    setLoading(true);
    try {
      await productClient.deleteProduct(id);
      await fetchProducts();
      setError(null);
    } catch (err) {
      setError((err as AxiosError).message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct,
  };
}
