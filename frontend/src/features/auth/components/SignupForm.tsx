import React from "react";
import { Stack } from "@mantine/core";
import { TextField } from "../../../shared/ui/TextField";
import { PasswordField } from "../../../shared/ui/PasswordField";
import { Button } from "../../../shared/ui/Button";

export interface SignupFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  isLoading?: boolean;
  errorText?: React.ReactNode;
}

export function SignupForm({ className, isLoading, errorText, ...props }: SignupFormProps) {
  return (
    <form className={className} noValidate {...props}>
      <Stack gap="md">
        <TextField
          id="name"
          name="name"
          label="Name"
          placeholder="Your name"
          required
          aria-required="true"
        />

        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          required
          aria-required="true"
        />

        <PasswordField
          id="password"
          name="password"
          label="Password"
          placeholder="Create a password"
          required
          aria-required="true"
          autoComplete="new-password"
        />

        {errorText ? (
          <div role="alert" className="text-red-600 text-sm">{errorText}</div>
        ) : null}

        <Button type="submit" fullWidth disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </Stack>
    </form>
  );
}
