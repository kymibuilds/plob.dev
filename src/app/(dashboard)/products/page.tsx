"use client";

import { useState, useRef, useEffect } from "react";
import { useKeyboard } from "@/components/keyboard-provider";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
  isActive: boolean;
  sales: number;
  revenue: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const { registerAction, unregisterAction } = useKeyboard();

  // Register keyboard actions
  useEffect(() => {
    registerAction("down", () => setFocusedIndex((i) => Math.min(i + 1, products.length - 1)));
    registerAction("up", () => setFocusedIndex((i) => Math.max(i - 1, 0)));
    registerAction("new", () => setIsAdding(true));
    registerAction("delete", () => {
      const product = products[focusedIndex];
      if (product && window.confirm(`Delete "${product.name}"?`)) handleDelete(product.id);
    });

    return () => {
      unregisterAction("down");
      unregisterAction("up");
      unregisterAction("new");
      unregisterAction("delete");
    };
  }, [products, focusedIndex, registerAction, unregisterAction]);

  useEffect(() => {
    fetchProducts();
  }, []);


  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsAdding(false);
        resetForm();
      }
    }

    if (isAdding) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAdding]);

  const resetForm = () => {
    setNewName("");
    setNewDescription("");
    setNewPrice("");
    setNewImageUrl("");
  };

  const handleAdd = async () => {
    if (!newName || !newPrice) return;

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          description: newDescription || null,
          price: newPrice,
          imageUrl: newImageUrl || null,
        }),
      });

      if (res.ok) {
        const newProduct = await res.json();
        setProducts([newProduct, ...products]);
        setIsAdding(false);
        resetForm();
      }
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentActive }),
      });

      if (res.ok) {
        const updated = await res.json();
        setProducts(products.map((p) => (p.id === id ? updated : p)));
      }
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto py-16 px-6 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">loading...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto py-16 px-6 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-normal">[manage products]</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="text-xs bg-foreground text-background px-3 py-1 hover:opacity-90 transition-opacity"
        >
          + new product
        </button>
      </div>

      <div className="flex flex-col gap-4 text-sm">
        {/* Add Form */}
        {isAdding && (
          <div
            ref={formRef}
            className="flex flex-col gap-3 p-4 border border-border bg-card/50 animate-in fade-in slide-in-from-top-1 duration-200"
          >
            <div className="flex flex-col gap-2">
              <input
                autoFocus
                type="text"
                placeholder="product name"
                className="text-sm font-medium bg-transparent border-b border-border outline-none placeholder:text-muted-foreground/50 pb-1"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                type="text"
                placeholder="brief description"
                className="text-xs bg-transparent border-b border-border outline-none placeholder:text-muted-foreground/50 pb-1 text-muted-foreground"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="price (e.g. $29 or free)"
                  className="flex-1 text-xs mono bg-transparent border-b border-border outline-none placeholder:text-muted-foreground/50 pb-1"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </div>
              <input
                type="text"
                placeholder="image URL (300x200 recommended)"
                className="text-xs mono bg-transparent border-b border-border outline-none placeholder:text-muted-foreground/50 pb-1 text-muted-foreground"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={handleAdd}
                className="text-xs bg-foreground text-background px-3 py-1 hover:opacity-90 transition-opacity"
              >
                save
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && !isAdding && (
          <div className="text-sm text-muted-foreground text-center py-8">
            no products yet. click + new product to create one.
          </div>
        )}

        {/* Products List */}
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`flex flex-col gap-3 p-4 border bg-card/50 group transition-all ${
              index === focusedIndex 
                ? "border-l-2 border-l-foreground border-border" 
                : "border-border"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-12 h-8 object-cover border border-border"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-medium">{product.name}</span>
                  <span className="mono text-xs text-muted-foreground">
                    {product.isActive ? "active" : "archived"} · {product.price}
                  </span>
                  {product.description && (
                    <span className="text-xs text-muted-foreground mt-1">
                      {product.description}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-3 text-xs opacity-50 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleToggleActive(product.id, product.isActive)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {product.isActive ? "archive" : "activate"}
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-muted-foreground hover:text-red-500"
                >
                  del
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs mono text-muted-foreground border-t border-dashed border-border pt-3">
              <span>{product.sales} sales</span>
              <span>${(product.revenue / 100).toFixed(0)} revenue</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
