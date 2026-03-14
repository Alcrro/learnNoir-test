import { type ButtonHTMLAttributes, type FC } from "react";
import { cn } from "../../libs/utils/cn";
import {
  buttonSizes,
  buttonVariants,
  type ButtonSizeType,
  type ButtonVariantType,
} from "../styles/buttonVariants";

type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
};
const DefaultButton: FC<DefaultButtonProps> = ({
  variant = "primary",
  size = "default",
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "btn",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
