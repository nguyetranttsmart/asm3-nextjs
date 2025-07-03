"use client";
import React, { useEffect, useState } from "react";
import { IProduct } from "@/components/products";
import ProductItem from "@/components/products/ProductItem";
import { Carousel } from "@/components/commons";

type ProductsProps = {
  typeId: string;
};
export default function ProductList({ typeId }: ProductsProps) {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/get-products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data: IProduct[] = await res.json();
      const filteredProduct = data.filter(
        (product: IProduct) => product.type === typeId
      );
      setProducts(filteredProduct);
    };
    fetchData();
  }, [typeId]);

  return (
    <Carousel
      items={products}
      renderItem={(item) => <ProductItem product={item} />}
      autoPlay={true}
      autoPlayInterval={2000}
      responsiveConfig={[
        { breakpoint: 1280, visibleCount: 3, itemToScroll: 3 },
        { breakpoint: 1024, visibleCount: 2, itemToScroll: 2 },
        { breakpoint: 768, visibleCount: 2, itemToScroll: 1 },
      ]}
    />
  );
}
