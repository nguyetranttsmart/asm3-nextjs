import React from "react";

type InputProps = {
  value: number;
  onChange: (value: number) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  onFocus?: () => void;
  onBlur?: () => void;
};
export default function Input({
  value,
  onChange,
  inputRef,
  onFocus,
  onBlur,
}: InputProps) {
  return (
    <input
      type="number"
      value={value}
      ref={inputRef}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
}
