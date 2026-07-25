import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, leftIcon, rightElement, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="w-full">
        {label ? (
          <label htmlFor={inputId} className="mb-1.5 block text-[13px] font-semibold text-neutral-charcoal">
            {label}
          </label>
        ) : null}
        <div className="relative">
          {leftIcon ? (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-stone">
              {leftIcon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined}
            className={cn(
              "gl-focus-ring h-[42px] w-full rounded-gl border bg-white px-3 text-[15px] text-botanical-black placeholder:text-neutral-stone disabled:cursor-not-allowed disabled:bg-neutral-cloud disabled:text-neutral-stone",
              leftIcon && "pl-10",
              rightElement && "pr-12",
              error ? "border-status-error" : "border-[#DDE5DC] focus-visible:border-botanical-green",
              className
            )}
            {...props}
          />
          {rightElement ? (
            <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</span>
          ) : null}
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

Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="w-full">
        {label ? (
          <label htmlFor={inputId} className="mb-1.5 block text-[13px] font-semibold text-neutral-charcoal">
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined}
          className={cn(
            "gl-focus-ring min-h-28 w-full resize-y rounded-gl border bg-white px-3 py-2.5 text-[15px] text-botanical-black placeholder:text-neutral-stone disabled:cursor-not-allowed disabled:bg-neutral-cloud disabled:text-neutral-stone",
            error ? "border-status-error" : "border-[#DDE5DC] focus-visible:border-botanical-green",
            className
          )}
          {...props}
        />
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

Textarea.displayName = "Textarea";
