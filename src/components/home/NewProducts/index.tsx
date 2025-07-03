"use client";
import React from "react";
import styles from "./NewProducts.module.css";
import Tabs, { ITabItem } from "@/components/commons/Tab";
import ProductDemo from "@/components/products/ProductDemo";

const priceRanges = [
  { label: "Under $25k", min: 0, max: 25000 },
  { label: "$25-40k", min: 25000, max: 40000 },
  { label: "$40-60k", min: 40000, max: 60000 },
  { label: "$60-80k", min: 60000, max: 80000 },
  { label: "Over $80k", min: 80000, max: Infinity },
];

const priceTabs: ITabItem[] = priceRanges.map((range) => ({
  key: range.label,
  label: range.label,
}));

function getPriceByLabel(label: string) {
  return priceRanges.find((price) => price.label === label);
}

const NewProducts = () => {
  return (
    <div className={styles.newProductSection}>
      <h3> Looking for a perfect match for your budget? </h3>

      <div className={styles.tabSection}>
        <Tabs
          tabs={priceTabs}
          renderContent={(selectedTab) => {
            const range = getPriceByLabel(selectedTab.key);
            if (!range) return null;
            return <ProductDemo priceMin={range.min} priceMax={range.max} />;
          }}
        ></Tabs>
      </div>
    </div>
  );
};

export default NewProducts;
