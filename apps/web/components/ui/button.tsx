import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-botanical-green text-white shadow-glXs hover:bg-[#194C31] active:bg-[#153F2A]",
  secondary:
    "border border-[#DDE5DC] bg-white text-botanical-black hover:bg-neutral-cloud active:bg-neutral-mist",
  tertiary:
    "bg-botanical-mint text-botanical-green hover:bg-[#DDF0E4] active:bg-[#D2E9DA]",
  ghost:
    "bg-transparent text-botanical-black hover:bg-neutral-mist active:bg-[#E4E9E2]",
  destructive:
    "bg-status-error text-white hover:bg-[#A93631] active:bg-[#8F2C28]"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-[15px]",
  icon: "h-10 w-10 p-0"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      asChild = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "gl-focus-ring inline-flex items-center justify-center gap-2 rounded-gl font-semibold transition disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      variants[variant],
      sizes[size],
      className
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string; children?: React.ReactNode }>;

      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
        children: (
          <>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : leftIcon}
            {child.props.children}
            {!isLoading ? rightIcon : null}
          </>
        )
      });
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : leftIcon}
        {children}
        {!isLoading ? rightIcon : null}
      </button>
    );
  }
);

Button.displayName = "Button";

export function PrimaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="primary" {...props} />;
}

export function SecondaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="secondary" {...props} />;
}
