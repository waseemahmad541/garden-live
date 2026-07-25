import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <label htmlFor={inputId} className="flex cursor-pointer items-start gap-3">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={cn(
            "gl-focus-ring mt-1 h-4 w-4 rounded border-[#DDE5DC] accent-botanical-green",
            className
          )}
          {...props}
        />
        <span>
          <span className="block text-sm font-semibold text-botanical-black">{label}</span>
          {description ? <span className="mt-1 block text-sm leading-5 text-neutral-slate">{description}</span> : null}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
