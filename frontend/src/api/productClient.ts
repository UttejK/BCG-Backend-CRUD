import type { Product } from "@/lib/types";
import axiosClient from "./axiosClient";

export const productClient = {
  getProducts: () => axiosClient.get("/products/"),
  getProductById: (id: number) => axiosClient.get(`/products/${id}/`),
  createProduct: (data: Product) => axiosClient.post("/products/", data),
  updateProduct: (id: number, data: Product) =>
    axiosClient.put(`/products/${id}/`, data),
  patchProduct: (id: number, data: Partial<Product>) =>
    axiosClient.patch(`/products/${id}/`, data),
  deleteProduct: (id: number) => axiosClient.delete(`/products/${id}/`),
};
