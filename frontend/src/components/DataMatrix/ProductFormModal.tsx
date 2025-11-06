// components/modals/ProductCreateModal.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/lib/types";
import * as React from "react";

export default function ProductFormModal({
  product,
  open,
  onOpenChange,
  onSubmit,
}: {
  product?: Product;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (data: Product) => void;
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit({
      name: String(fd.get("name") || ""),
      category: String(fd.get("category") || ""),
      cost_price: Number(fd.get("costPrice") || 0),
      selling_price: Number(fd.get("sellingPrice") || 0),
      description: String(fd.get("description") || ""),
      stock_available: Number(fd.get("stock") || 0),
      units_sold: Number(fd.get("unitsSold") || 0),
      status: "ACTIVE",
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-w-xl 
          rounded-2xl 
          border border-zinc-800 
          bg-zinc-900 text-zinc-100 
          p-0
        "
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader className="px-6 pt-5 pb-3">
            <DialogTitle className="text-lg">Add New Products</DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-4">
            {/* Product Name */}
            <div className="space-y-1.5">
              <Label className="text-zinc-300">Product Name :</Label>
              <Input
                name="name"
                placeholder="Enter Product Name"
                className="bg-zinc-800 border-zinc-700 placeholder:text-zinc-500"
                defaultValue={product?.name}
              />
            </div>

            {/* Product Category */}
            <div className="space-y-1.5">
              <Label className="text-zinc-300">Product Category :</Label>
              <Input
                name="category"
                placeholder="Enter product category"
                className="bg-zinc-800 border-zinc-700 placeholder:text-zinc-500"
                defaultValue={product?.category}
              />
            </div>

            {/* Cost / Selling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-zinc-300">Cost Price :</Label>
                <Input
                  name="costPrice"
                  type="number"
                  inputMode="decimal"
                  placeholder="xx,xxx,xxx"
                  className="bg-zinc-800 border-zinc-700 placeholder:text-zinc-500"
                  defaultValue={product?.cost_price}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300">Selling Price :</Label>
                <Input
                  name="sellingPrice"
                  type="number"
                  inputMode="decimal"
                  placeholder="xx,xxx,xxx"
                  className="bg-zinc-800 border-zinc-700 placeholder:text-zinc-500"
                  defaultValue={product?.selling_price}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label className="text-zinc-300">Description :</Label>
              <Textarea
                name="description"
                placeholder="Enter Description"
                className="bg-zinc-800 border-zinc-700 placeholder:text-zinc-500 min-h-24"
                defaultValue={product?.description ?? "-"}
              />
            </div>

            {/* Stock / Units Sold */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-zinc-300">Available Stock :</Label>
                <Input
                  name="stock"
                  type="number"
                  inputMode="numeric"
                  placeholder="xx,xxx,xxx"
                  className="bg-zinc-800 border-zinc-700 placeholder:text-zinc-500"
                  defaultValue={product?.stock_available}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300">Units Sold :</Label>
                <Input
                  name="unitsSold"
                  type="number"
                  inputMode="numeric"
                  placeholder="xx,xxx,xxx"
                  className="bg-zinc-800 border-zinc-700 placeholder:text-zinc-500"
                  defaultValue={product?.units_sold}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 pb-5">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="border-zinc-700 text-zinc-900 hover:bg-zinc-800 hover:text-zinc-100"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-emerald-500 text-black hover:bg-emerald-600"
            >
              {product ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
