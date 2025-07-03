"use client";
import { IProduct } from "@/components/products";
import { useEffect, useState } from "react";

export default function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/get-products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data: IProduct[] = await res.json();

      setProducts(data);
    };
    fetchData();
  }, []);

  return products;
}
