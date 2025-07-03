"use client";

import React from "react";
import styles from "./RangeSlider.module.css";

type SliderDotsProps = {
  value: number;
  onChange: (val: number) => void;
};

const min = 8;
const max = 17;
const step = 0.1;

export default function SliderDots({ value, onChange }: SliderDotsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const dots = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <div className={styles.wrapper}>
      <div className={styles.trackContainer}>
        <div className={styles.dots}>
          {dots.map((_, idx) => (
            <span key={idx} className={styles.dot} />
          ))}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className={styles.slider}
        />
      </div>
    </div>
  );
}
