import React from "react";
import { Group, Text } from "@mantine/core";
import { InlineLink } from "../../../shared/ui/InlineLink";

type Mode = "login" | "signup";

export interface AuthSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: Mode;         
  toLogin?: string;   
  toSignup?: string;  
}

export function AuthSwitcher({
  className,
  mode,
  toLogin = "/login",
  toSignup = "/signup",
  ...rest
}: AuthSwitcherProps) {
  const isLogin = mode === "login";
  return (
    <Group justify="center" gap={6} className={className} {...rest}>
      <Text size="sm" c="dimmed">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
      </Text>
      <InlineLink to={isLogin ? toSignup : toLogin} size="sm">
        {isLogin ? "Sign up" : "Sign in"}
      </InlineLink>
    </Group>
  );
}
