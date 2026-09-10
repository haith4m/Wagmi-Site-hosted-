import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-md border border-foreground/10 bg-surface p-6 ${className}`}
    >
      {children}
    </div>
  );
}

