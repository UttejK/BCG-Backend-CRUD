import { productClient } from "@/api/productClient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Product } from "@/lib/types";
import { useEffect, useState } from "react";

export default function ProductFormModal({
  product_id,
}: {
  product_id?: number;
}) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!product_id) return;
    productClient
      .getProductById(product_id)
      .then((res) => setProduct(res.data));
  }, [product_id]);

  if (!product_id) return null;
  if (!product)
    return <div className="p-4 text-sm text-muted-foreground">Loading…</div>;

  const fields = Object.keys(product).filter(
    (k) =>
      !["id", "created_at", "updated_at", "createdAt", "updatedAt"].includes(k)
  );

  return (
    <div className="p-6">
      <div className="grid gap-3">
        {fields.map((k) => (
          <div
            key={k}
            className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2"
          >
            <Label className="text-sm text-muted-foreground">
              {k.replace(/[_-]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2")}
            </Label>
            <Input
              className="sm:col-span-2"
              defaultValue={String(product[k as keyof Product] ?? "")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
