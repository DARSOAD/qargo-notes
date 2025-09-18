import React, { forwardRef } from "react";
import { TextInput, type TextInputProps } from "@mantine/core";

export type TextFieldProps = Omit<TextInputProps, "type"> & {
    type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
    hint?: string;
    errorText?: React.ReactNode;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    ({ className, hint, errorText, required, ...props }, ref) => {
        return (
            <TextInput
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
TextField.displayName = "TextField";
