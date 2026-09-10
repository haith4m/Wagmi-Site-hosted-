import type { InputHTMLAttributes, LabelHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export const inputClasses =
  "w-full rounded-md border border-foreground/15 bg-background px-4 py-3 text-sm text-foreground placeholder-foreground/35 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 disabled:opacity-60";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${inputClasses} ${props.className ?? ""}`} {...props} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${inputClasses} min-h-32 resize-y ${props.className ?? ""}`} {...props} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={`${inputClasses} appearance-none ${props.className ?? ""}`} {...props} />;
}

export function Label({ children, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="mb-1.5 block font-kicker text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/60" {...props}>
      {children}
    </label>
  );
}

export function Field({ label, htmlFor, children, hint }: { label: string; htmlFor: string; children: ReactNode; hint?: string }) {
  return (
    <div>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? <p className="mt-1.5 text-xs text-foreground/40">{hint}</p> : null}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "border-foreground/15 bg-foreground/5 text-foreground/70",
    accent: "border-accent bg-accent text-accent-ink",
    success: "border-foreground/20 bg-transparent text-accent",
    warning: "border-foreground/20 bg-transparent text-foreground",
    danger: "border-danger/40 bg-danger/10 text-danger",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-kicker text-[10px] font-bold uppercase tracking-[0.16em] ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
