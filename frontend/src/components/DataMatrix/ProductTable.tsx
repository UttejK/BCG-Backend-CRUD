import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProducts } from "@/hooks/useProduct";
import type { Product } from "@/lib/types";
import { useEffect, useMemo } from "react";

export default function ProductTable() {
  const { products, fetchProducts } = useProducts();
  const columns: { key: keyof Product; label: string }[] = useMemo(
    () => [
      { key: "name", label: "Product Name" },
      { key: "category", label: "Category" },
      { key: "cost_price", label: "Cost Price" },
      { key: "selling_price", label: "Selling Price" },
      { key: "stock_available", label: "Stock" },
      { key: "units_sold", label: "Units Sold" },
      { key: "customer_rating", label: "Rating" },
      { key: "demand_forecast", label: "Forecast" },
      { key: "optimized_price", label: "Optimized Price" },
      { key: "status", label: "Status" },
    ],
    []
  );
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((c) => (
              <TableHead key={c.key}>{c.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.product_id}>
              {columns.map((c) => (
                <td key={c.key}>{product[c.key]}</td>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
