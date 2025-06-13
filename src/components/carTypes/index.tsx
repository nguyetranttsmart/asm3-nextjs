"use client";
import React from "react";
import styles from "./CarTypes.module.css";
import Carousel from "../Carousel/Carousel";
import { ICarType } from "@/components/carTypes/type";

interface CarTypesProps {
  carTypes: ICarType[];
  onSelectType: (typeId: string) => void;
}

export default function CarTypes({ carTypes, onSelectType }: CarTypesProps) {
  return (
    <div className={styles.productCarouselWrapper}>
      <Carousel
        items={carTypes}
        scrollAmount={820}
        renderItem={(carType) => {
          return (
            <div
              className={styles.carType}
              onClick={() => onSelectType(carType.id)}
            >
              <img src={carType.imageUrl} />
              <p>{carType.name}</p>
            </div>
          );
        }}
      />
    </div>
  );
}
