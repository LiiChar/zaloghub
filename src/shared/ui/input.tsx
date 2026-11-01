import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...attr }: InputProps) => {
  return (
    <input
      {...attr}
      className={`
        h-10 w-full min-w-0
        rounded-lg border border-border
        bg-background px-3.5 py-2
        text-sm text-foreground
        shadow-sm
        placeholder:text-muted-foreground
        transition-all duration-200
        hover:border-primary/40
        focus-visible:border-primary
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-primary/20
        disabled:cursor-not-allowed disabled:opacity-50
        ${className ?? ""}
      `}
    />
  );
};
