import React from "react";
import styles from "./LoanTermSelector.module.css";

type LoanTermSelectorProps = {
  selectedYear: number;
  setSelectedYear: (value: number) => void;
};
const loanNumber = [2, 3, 4, 5, 6, 7];
export default function LoanTermSelector({
  selectedYear,
  setSelectedYear,
}: LoanTermSelectorProps) {
  return (
    <>
      <div className={styles.loanBlock}>
        <div className={styles.loanBlockTitle}>
          <p>Term of loan (years)</p>
        </div>
        <div className={styles.loanBlockButtons}>
          {loanNumber.map((num) => (
            <button
              type="button"
              key={num}
              className={`${styles.loanButton} ${
                selectedYear === num ? styles.active : ""
              }`}
              onClick={() => setSelectedYear(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
