import React from "react";
import { IProduct } from "@/components/products";
import styles from "./ProductItem.module.css";

interface Props {
  product: IProduct;
}
export default function ProductItem({ product }: Props) {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.carImage}>
          <img src={product.imageUrl} className={styles.image} />
        </div>
        <div className={styles.carDescription}>
          <p>{product.name}</p>
          <span>{product.brand}</span>
          <span>{product.distance}</span>
        </div>
        <div className={styles.carPrice}>
          <p>{product.price}</p>
          <span>
            est. <b>$124/wk</b> based on <b>10.02%</b> p.a.
          </span>
        </div>
      </div>
    </>
  );
}
