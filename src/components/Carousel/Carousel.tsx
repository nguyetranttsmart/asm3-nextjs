"use client";
import React, { ReactNode, useRef } from "react";
import styles from "./Carousel.module.css";

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  scrollAmount?: number;
};
export default function Carousel<T>({
  items,
  renderItem,
  scrollAmount = 300,
}: CarouselProps<T>) {
  const listRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (listRef.current) {
      let amount = 0;
      if (direction === "left") {
        amount = -scrollAmount;
      } else {
        amount = scrollAmount;
      }
      listRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.carouselWrapper}>
      <button className={styles.prevButton} onClick={() => scroll("left")}>
        &larr;
      </button>

      <div className={styles.itemsList} ref={listRef}>
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
      <button className={styles.nextButton} onClick={() => scroll("right")}>
        &rarr;
      </button>
    </div>
  );
}
