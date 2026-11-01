import { useContext, type ReactNode } from "react";
import { SelectContext } from "./select";

export type SelectItemProps = {
  value: string;
  children: ReactNode;
  disabled?: boolean;
};

export const SelectItem = ({
  value,
  children,
  disabled = false,
}: SelectItemProps) => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("SelectItem must be used inside Select");
  }

  const selected = context.value === value;

  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      disabled={disabled}
      onClick={() => context.onSelect(value)}
      className={`
        flex w-full items-center justify-between
        rounded-md px-3 py-2
        text-left text-sm
        transition-colors duration-150
        disabled:pointer-events-none disabled:opacity-50
        ${
          selected
            ? "bg-primary/10 text-primary font-medium"
            : "text-foreground hover:bg-muted"
        }
      `}
    >
      {children}

      {selected && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="size-4 shrink-0"
        >
          <path d="m5 12 4 4L19 6" />
        </svg>
      )}
    </button>
  );
};
