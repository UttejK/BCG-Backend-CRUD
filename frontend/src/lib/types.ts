import { z } from "zod";

export type ProductStatus = "ACTIVE" | "INACTIVE" | "DISCONTINUED";

export const ProductSchema = z.object({
  product_id: z.number().optional(),
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  cost_price: z.number().nonnegative(),
  selling_price: z.number().nonnegative(),
  category: z.string().min(1),
  stock_available: z.number().int().nonnegative().default(0),
  units_sold: z.number().int().nonnegative().default(0),
  customer_rating: z.number().min(1).max(5).optional(),
  demand_forecast: z.number().int().nonnegative().optional(),
  optimized_price: z.number().nonnegative().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "DISCONTINUED"]).default("ACTIVE"),
});

export type Product = z.infer<typeof ProductSchema>;
