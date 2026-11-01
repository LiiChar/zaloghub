import type { HTMLAttributes } from "react";

export type ListItemProps = HTMLAttributes<HTMLDivElement>;

export const ListItem = ({
  children,
  className,
  ...attr
}: ListItemProps) => {
  return (
    <div
      {...attr}
      className={`
        group flex items-center
        rounded-lg border border-border
        bg-background px-3 py-2.5
        shadow-sm
        transition-all duration-200
        hover:border-primary/30
        hover:bg-muted/30
        ${className ?? ""}
      `}
    >
      {children}
    </div>
  );
};
