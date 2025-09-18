import React, { forwardRef } from "react";
import {
  Button as MantineButton,
  type ButtonProps as MantineButtonProps,
} from "@mantine/core";

type MantineVariant = MantineButtonProps["variant"];
type MantineSize = MantineButtonProps["size"];
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type WrapperVariant = MantineVariant | "ghost";

export interface ButtonProps
  extends Omit<MantineButtonProps, "variant" | "size" | "type" | "onClick">,
    Pick<NativeButtonProps, "onClick" | "type"> {
  variant?: WrapperVariant;
  size?: MantineSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "filled",
      size = "md",
      type,
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    const mantineVariant: MantineVariant =
      variant === "ghost" ? "subtle" : variant;

    return (
      <MantineButton
        ref={ref}
        className={className}
        variant={mantineVariant}
        size={size}
        type={type ?? "button"}        
        onClick={onClick}             
        disabled={disabled}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";