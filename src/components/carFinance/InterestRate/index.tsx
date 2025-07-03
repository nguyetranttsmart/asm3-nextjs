import React, { useRef, useState } from "react";
import styles from "./InterestRate.module.css";
import Input from "@/components/commons/Input";
import RangeSlider from "@/components/commons/RangeSlider";

type InterestRateProps = {
  interestRate: number;
  setInterestRate: (value: number) => void;
};
export default function InterestRate({
  interestRate,
  setInterestRate,
}: InterestRateProps) {
  const interestRateInputRef = useRef<HTMLInputElement>(null);

  const [isInterestRateFocused, setIsInterestRateFocused] = useState(false);
  return (
    <>
      <div className={styles.interestRate}>
        <div className={styles.interestRateInfo}>
          <div className={styles.leftBlock}>
            <p>Interest rate</p>
            <span>Slide between 8% and 17%</span>
          </div>

          <div className={styles.rightBlock}>
            <div
              className={`${styles.interestRateInput} ${
                isInterestRateFocused ? styles.focusedInput : ""
              }`}
              onClick={() => interestRateInputRef.current?.focus()}
            >
              <Input
                value={interestRate}
                onChange={setInterestRate}
                onFocus={() => setIsInterestRateFocused(true)}
                onBlur={() => setIsInterestRateFocused(false)}
                inputRef={interestRateInputRef}
              />
              <span> %</span>
            </div>
          </div>
        </div>
        <div className={styles.inputRangeSlider}>
          <RangeSlider
            value={interestRate}
            onChange={(val: number) => {
              setInterestRate(val);
            }}
          />
        </div>
      </div>
    </>
  );
}
