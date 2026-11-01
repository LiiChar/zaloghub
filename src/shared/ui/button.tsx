import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "bg-transparent text-foreground hover:bg-muted",
  destructive: "border border-destructive bg-transparent hover:border-destructive/90",
};

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  ...attr
}: ButtonProps) => {
  return (
    <button
      {...attr}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg font-medium
        transition-all duration-200
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-primary/40
        disabled:pointer-events-none disabled:opacity-50
        active:scale-[0.98]
        ${variants[variant]}
        ${sizes[size]}
        ${className ?? ""}
      `}
    >
      {children}
    </button>
  );
};
