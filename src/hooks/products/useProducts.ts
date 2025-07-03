"use client";
import { IProduct } from "@/components/products";
import React, { useState, useEffect, use } from "react";

type ProductsProps = {
  typeId: string;
};
export default function useProducts({ typeId }: ProductsProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/get-products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data: IProduct[] = await res.json();
      const filteredProducts = data.filter(
        (product: IProduct) => product.type === typeId
      );
      setProducts(filteredProducts);
    };
    fetchData();
  }, [typeId]);
  return products;
}
