"use client";
import { useMemo, useState } from "react";
import InterestRate from "../InterestRate";
import LoanTermSelector from "../LoanTermSelector";
import PaymentBlock from "../PaymentBlock";
import PriceInput from "../PriceInput";
import styles from "./CarFinance.module.css";

export default function CarFinance() {
  const [selectedYear, setSelectedYear] = useState(2);
  const [purchasePrice, setPurchasePrice] = useState(150);
  const [depositAmount, setDepositAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(8);

  const finalPrice = useMemo(() => {
    return (
      ((purchasePrice - depositAmount) * (1 + interestRate / 100)) /
      (selectedYear * 52)
    );
  }, [purchasePrice, depositAmount, selectedYear, interestRate]);

  return (
    <div className={styles.carFinance}>
      <form className={styles.carFinanceForm}>
        <PriceInput
          purchasePrice={purchasePrice}
          depositAmount={depositAmount}
          setPurchasePrice={(purchasePrice) => setPurchasePrice(purchasePrice)}
          setDepositAmount={(depositAmount) => setDepositAmount(depositAmount)}
        />
        <LoanTermSelector
          selectedYear={selectedYear}
          setSelectedYear={(year) => setSelectedYear(year)}
        />
        <InterestRate
          interestRate={interestRate}
          setInterestRate={(rate) => setInterestRate(rate)}
        />
        <PaymentBlock finalPrice={finalPrice} />
      </form>
    </div>
  );
}
