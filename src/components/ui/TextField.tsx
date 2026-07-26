import type { InputHTMLAttributes } from "react";
import { fieldClasses } from "./fieldStyles";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  /** Extra classes for the wrapper (e.g. grid column spans). */
  wrapperClassName?: string;
  /** Render the value in the monospace face (for codes/identifiers). */
  mono?: boolean;
}

export function TextField({
  label,
  id,
  name,
  wrapperClassName = "",
  mono = false,
  ...props
}: TextFieldProps) {
  const inputId = id ?? name;
  return (
    <div className={wrapperClassName}>
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-xs font-medium text-slate-600"
      >
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        className={`${fieldClasses} ${mono ? "font-mono tracking-tight" : ""}`}
        {...props}
      />
    </div>
  );
}
