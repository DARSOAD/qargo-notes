import React, { forwardRef } from "react";
import { PasswordInput, type PasswordInputProps } from "@mantine/core";

export type PasswordFieldProps = PasswordInputProps & {
  hint?: string;
  errorText?: React.ReactNode;
};

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ className, hint, errorText, required, ...props }, ref) => {
    return (
      <PasswordInput
        className={className}
        description={hint}
        error={errorText}
        withAsterisk={required}
        ref={ref}
        required={required}
        {...props}
      />
    );
  }
);
PasswordField.displayName = "PasswordField";
