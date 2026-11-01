import type { InputHTMLAttributes } from "react";

export type CheckedProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

export const CheckBox = ({
  className,
  ...attr
}: CheckedProps) => {
  return (
    <input
      {...attr}
      type="checkbox"
      className={`
        size-4 shrink-0
        cursor-pointer
        rounded
        accent-primary
        transition-all
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary/30
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className ?? ""}
      `}
    />
  );
};
