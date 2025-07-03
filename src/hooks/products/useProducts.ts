"use client";
import { IProduct } from "@/components/products";
import { MAIN_URL } from "@/config";
import { useEffect, useState } from "react";

export default function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      if (!MAIN_URL) return;
      const res = await fetch(`${MAIN_URL}/api/get-products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data: IProduct[] = await res.json();

      setProducts(data);
    };
    fetchData();
  }, []);

  return products;
}
