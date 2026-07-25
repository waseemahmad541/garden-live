import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, helperText, error, options, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="w-full">
        {label ? (
          <label htmlFor={inputId} className="mb-1.5 block text-[13px] font-semibold text-neutral-charcoal">
            {label}
          </label>
        ) : null}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined}
            className={cn(
              "gl-focus-ring h-[42px] w-full appearance-none rounded-gl border bg-white px-3 pr-10 text-[15px] text-botanical-black disabled:cursor-not-allowed disabled:bg-neutral-cloud disabled:text-neutral-stone",
              error ? "border-status-error" : "border-[#DDE5DC] focus-visible:border-botanical-green",
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-stone" aria-hidden />
        </div>
        {error ? (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-status-error">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-help`} className="mt-1.5 text-sm text-neutral-slate">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";
