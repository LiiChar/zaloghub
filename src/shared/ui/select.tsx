
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

import { SelectItem, type SelectItemProps } from "./select-item";

type SelectContextValue = {
  value: string;
  onSelect: (value: string) => void;
  close: () => void;
};

export type SelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  placeholder?: string;
  className?: string;
};

export const SelectContext = createContext<SelectContextValue | null>(null);

export const Select = ({
  value,
  onValueChange,
  children,
  placeholder = "Выберите значение",
  className,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const items = Children.toArray(children).filter(
    (child): child is ReactElement<SelectItemProps> =>
      isValidElement<SelectItemProps>(child)
  );

  const selectedItem = items.find(
    (item) => item.props.value === value
  );

  const close = () => setOpen(false);

  const handleSelect = (nextValue: string) => {
    onValueChange(nextValue);
    close();
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative w-full ${className ?? ""}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`
          flex w-full items-center justify-between gap-3
          rounded-lg border border-border
          bg-background px-3.5 py-2.5
          text-sm text-foreground
          shadow-sm
          transition-all duration-200
          hover:border-primary/50
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-primary/30
          ${open ? "border-primary ring-2 ring-primary/20" : ""}
        `}
      >
        <span className="truncate">
          {selectedItem?.props.children ?? placeholder}
        </span>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="
            absolute left-0 top-full z-50 mt-2
            w-full overflow-hidden
            rounded-lg border border-border
            bg-background p-1
            shadow-lg
            animate-in fade-in slide-in-from-top-1 duration-150
          "
        >
          <SelectContext.Provider
            value={{
              value,
              onSelect: handleSelect,
              close,
            }}
          >
            {children}
          </SelectContext.Provider>
        </div>
      )}
    </div>
  );
};
