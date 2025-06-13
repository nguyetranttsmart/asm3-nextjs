"use client";
import React from "react";
import { IProduct } from "@/components/products";
import styles from "./ProductList.module.css";
import ProductItem from "@/components/products/ProductItem";
import Carousel from "@/components/Carousel/Carousel";

type ProductListProps = {
  products: IProduct[];
};
export default function ProductList({ products }: ProductListProps) {
  return (
    <div className={styles.productCarouselWrapper}>
      <Carousel
  items={products}
  renderItem={(product, index) => (
    <ProductItem key={product.id } product={product} />
  )}
  scrollAmount={500}
/>
    </div>
  );
}
