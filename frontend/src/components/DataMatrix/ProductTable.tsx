import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProducts } from "@/hooks/useProduct";
import type { Product } from "@/lib/types";
import { Eye, Pencil, Trash2 } from "lucide-react";
import ProductFormModal from "./ProductFormModal";
import { Button } from "../ui/button";

// --- small format helpers ---
const fmtCurrency = (n?: number | null) =>
  n == null ? "-" : `$ ${Number(n).toLocaleString()}`;
const fmtNumber = (n?: number | null) =>
  n == null ? "-" : Number(n).toLocaleString();

export default function ProductTable() {
  const {
    products,
    loading,
    error,
    deleteProduct,
    updateProduct,
    createProduct,
  } = useProducts();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  // selection (checkboxes)
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const allSelected =
    products.length > 0 && selectedIds.length === products.length;
  const toggleOne = (id: number) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const toggleAll = () =>
    setSelectedIds((prev) =>
      prev.length === products.length
        ? []
        : products
            .map((p) => p.product_id)
            .filter((id): id is number => id != null)
    );

  // columns config (order matches your screenshot)
  const columns: {
    key: keyof Product;
    label: string;
    render?: (p: Product) => React.ReactNode;
    className?: string;
  }[] = useMemo(
    () => [
      // we render checkbox separately as the first column
      { key: "name", label: "Product Name" },
      { key: "category", label: "Product Category" },
      {
        key: "cost_price",
        label: "Cost Price",
        render: (p) => fmtCurrency(p.cost_price),
      },
      {
        key: "selling_price",
        label: "Selling Price",
        render: (p) => fmtCurrency(p.selling_price),
      },
      {
        key: "description",
        label: "Description",
        render: (p) =>
          p.description ? (
            <span className="line-clamp-2 text-muted-foreground">
              {p.description}
            </span>
          ) : (
            <span className="text-muted-foreground">—</span>
          ),
        className: "max-w-[480px]",
      },
      {
        key: "stock_available",
        label: "Available Stock",
        render: (p) => fmtNumber(p.stock_available),
      },
      {
        key: "units_sold",
        label: "Units Sold",
        render: (p) => (
          <button
            className="text-teal-600 hover:underline"
            title="View sales details"
            onClick={() => console.log("view sales", p.product_id)}
          >
            {fmtNumber(p.units_sold)}
          </button>
        ),
      },
      {
        key: "demand_forecast",
        label: "Calculated Demand Forecast",
        render: (p) =>
          p.demand_forecast != null ? (
            <button
              className="text-teal-600 hover:underline"
              title="View forecast"
              onClick={() => console.log("view forecast", p.product_id)}
            >
              {fmtNumber(p.demand_forecast)}
            </button>
          ) : (
            <span className="text-muted-foreground">-</span>
          ),
      },
    ],
    []
  );

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Button
        onClick={() => {
          setProduct(null);
          setOpen(true);
        }}
      >
        Add Product
      </Button>
      <Table className="[&_th]:whitespace-nowrap">
        <TableHeader>
          <TableRow>
            {/* checkbox header */}
            <TableHead className="w-10">
              <input
                type="checkbox"
                aria-label="Select all"
                checked={allSelected}
                onChange={toggleAll}
                className="h-4 w-4 accent-foreground"
              />
            </TableHead>

            {columns.map((c) => (
              <TableHead key={c.key} className={c.className}>
                {c.label}
              </TableHead>
            ))}

            <TableHead className="text-right pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((p, idx) => (
            <TableRow
              key={p.product_id}
              className={idx % 2 ? "bg-muted/20" : undefined} // subtle zebra like screenshot
            >
              {/* row checkbox */}
              <TableCell className="w-10">
                <input
                  type="checkbox"
                  aria-label={`Select ${p.name}`}
                  checked={selectedIds.includes(p.product_id!)}
                  onChange={() => toggleOne(p.product_id!)}
                  className="h-4 w-4 accent-foreground"
                />
              </TableCell>

              {/* data cells */}
              {columns.map((c) => (
                <TableCell key={c.key} className={c.className}>
                  {c.render ? c.render(p) : String(p[c.key] ?? "—")}
                </TableCell>
              ))}

              {/* actions */}
              <TableCell className="text-right">
                <div className="inline-flex items-center gap-3 pr-1">
                  <button
                    className="p-1 hover:opacity-80"
                    title="View"
                    onClick={() => console.log("view", p.product_id)}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    className="p-1 hover:opacity-80 cursor-pointer"
                    title="Edit"
                    onClick={() => {
                      setOpen(true);
                      setProduct(p);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    className="p-1 hover:text-destructive cursor-pointer"
                    title="Delete"
                    onClick={() =>
                      confirm(
                        "Are you sure you want to delete this product?"
                      ) && deleteProduct(p.product_id!)
                    }
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {loading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + 2}
                className="text-center py-10"
              >
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            products.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  className="text-center py-10"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <ProductFormModal
        product={product ?? undefined}
        open={open}
        onOpenChange={(prev) => setOpen(prev)}
        onSubmit={(data) => {
          if (product) updateProduct(product.product_id!, data);

          createProduct(data);

          setOpen(false);
        }}
      />
    </div>
  );
}
