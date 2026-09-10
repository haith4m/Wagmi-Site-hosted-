import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent/85 hover:-translate-y-px",
  secondary: "border border-foreground/25 bg-transparent text-foreground hover:border-foreground/60 hover:bg-foreground/5",
  ghost: "bg-transparent px-2 text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:text-accent",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
      <span aria-hidden className="text-base leading-none">→</span>
    </button>
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function LinkButton({ variant = "primary", children, className = "", ...props }: LinkButtonProps) {
  return (
    <a className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
      <span aria-hidden className="text-base leading-none">→</span>
    </a>
  );
}

