import React, { useRef, useState } from "react";
import Input from "@/components/commons/Input";
import styles from "./PriceInput.module.css";

type PriceInputProps = {
  purchasePrice: number;
  depositAmount: number;
  setPurchasePrice: (val: number) => void;
  setDepositAmount: (val: number) => void;
};
export default function PriceInput({
  purchasePrice,
  depositAmount,

  setPurchasePrice,
  setDepositAmount,
}: PriceInputProps) {
  const purchaseInputRef = useRef<HTMLInputElement>(null);
  const depositInputRef = useRef<HTMLInputElement>(null);
  const [isDepositFocused, setIsDepositFocused] = useState(false);
  const [isPurcharseFocused, setIsPurcharseFocused] = useState(false);

  return (
    <>
      <div className={styles.myRepayment}>
        <div className={styles.myRepaymentTitle}>
          <p>How do you want to spend?</p>
        </div>
        <div className={styles.myRepaymentInput}>
          <div
            className={`${styles.purcharsePriceInput} ${
              isPurcharseFocused ? styles.focusedInput : ""
            }`}
            onClick={() => purchaseInputRef.current?.focus()}
          >
            <p>
              <b>Purcharse Price</b>
            </p>
            <span>
              ${" "}
              <Input
                value={purchasePrice}
                inputRef={purchaseInputRef}
                onChange={setPurchasePrice}
                onFocus={() => setIsPurcharseFocused(true)}
                onBlur={() => setIsPurcharseFocused(false)}
              />
            </span>
          </div>
          <div
            className={`${styles.depositAmountInput} ${
              isDepositFocused ? styles.focusedInput : ""
            }`}
            onClick={() => depositInputRef.current?.focus()}
          >
            <b>
              <p>Deposit Amount</p>
            </b>
            <span>
              ${" "}
              <Input
                value={depositAmount}
                inputRef={depositInputRef}
                onChange={setDepositAmount}
                onFocus={() => setIsDepositFocused(true)}
                onBlur={() => setIsDepositFocused(false)}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
