import type { ComponentProps, ReactElement } from "react";

type ButtonVariant = "primary" | "tertiary";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ComponentProps<"button"> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  right?: ReactElement;
}

const Button = ({
  label,
  variant = "primary",
  size = "md",
  className,
  right,
  ...buttonProps
}: ButtonProps) => {
  const baseClassName = `flex rounded-lg typo-caption gap-1 items-center justify-center`;
  const sizeClassName = `${size === "sm" ? "py-1 px-2.5 " : "py-3 px-5"}`;
  const variantClassName = `${variant === "primary" ? "bg-palette-primary text-palette-white" : "bg-palette-lightgray text-text-secondary"}`;
  const buttonClassName = [
    baseClassName,
    sizeClassName,
    variantClassName,
    className,
  ].join(" ");

  return (
    <button className={buttonClassName} {...buttonProps}>
      <span>{label}</span>
      {right}
    </button>
  );
};

export default Button;
