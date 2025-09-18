import React from "react";
import { Stack } from "@mantine/core";
import { TextField } from "../../../shared/ui/TextField";
import { PasswordField } from "../../../shared/ui/PasswordField";
import { Button } from "../../../shared/ui/Button";

export interface LoginFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  isLoading?: boolean;
  errorText?: React.ReactNode;
}

export function LoginForm({ className, isLoading, errorText, ...props }: LoginFormProps) {
  return (
    <form className={className} noValidate {...props}>
      <Stack gap="md">
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
          placeholder="••••••••"
          required
          aria-required="true"
          autoComplete="current-password"
        />

        {errorText ? (
          <div role="alert" className="text-red-600 text-sm">{errorText}</div>
        ) : null}

        <Button type="submit" fullWidth disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </Stack>
    </form>
  );
}
