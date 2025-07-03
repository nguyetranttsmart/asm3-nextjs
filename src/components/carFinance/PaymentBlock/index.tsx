import React from "react";
import styles from "./PaymentBlock.module.css";
type PaymentBlockProps = {
  finalPrice: number;
};
export default function PaymentBlock({ finalPrice }: PaymentBlockProps) {
  return (
    <>
      <div className={styles.paymentBlock}>
        <div className={styles.paymentBlockLable}>
          <p>Your estimated weekly repayment</p>
          <h2>
            ${finalPrice.toFixed(0)}
            <span>/week*</span>
          </h2>
        </div>
        <div className={styles.paymentBlockButton}>
          <button>Get personalised quotes</button>
        </div>
      </div>
    </>
  );
}
