import type { HTMLAttributes } from "react";

export type ListProps = {
  isEmpty?: boolean;
  emptyMessage?: string;
} & HTMLAttributes<HTMLDivElement>;

export const List = ({
  isEmpty = false,
  emptyMessage = "Пока нет задач",
  children,
  className,
  ...attr
}: ListProps) => {
  return (
    <div
      {...attr}
      className={`flex flex-col gap-2 ${className ?? ""}`}
    >
      {isEmpty ? (
        <div className="
          flex flex-col items-center justify-center
          rounded-xl border border-dashed border-border
          bg-muted/20 px-4 py-10
          text-center
        ">
          <div className="
            mb-3 flex size-10 items-center justify-center
            rounded-full bg-muted text-muted-foreground
          ">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="size-5"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>

          <p className="text-sm font-medium text-foreground">
            {emptyMessage}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Добавьте новую задачу, чтобы начать
          </p>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
