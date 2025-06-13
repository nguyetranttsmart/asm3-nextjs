"use client";

import React, { useEffect, useState } from "react";
import { IProduct } from "@/components/products";
import styles from "./Products.module.css";
import ProductList from "@/components/products/ProductList";
import { ICarType } from "@/components/carTypes/type";
import CarTypes from "@/components/carTypes";

export default function Page() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [carTypes, setCarTypes] = useState<ICarType[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      const productRes = await fetch("http://localhost:3000/api/get-products");
      const productsData: IProduct[] = await productRes.json();
      setProducts(productsData);

      const typeRes = await fetch("http://localhost:3000/api/get-types");
      const typesData: ICarType[] = await typeRes.json();
      setCarTypes(typesData);
    };

    fetchData();
  }, []);

  const filteredProducts =
    selectedType === "all"
      ? products
      : products.filter((product) => product.type === selectedType);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Looking for a specific size?</h1>
      <CarTypes carTypes={carTypes} onSelectType={setSelectedType} />

      <ProductList products={filteredProducts} />
    </div>
  );
}
