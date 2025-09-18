import React from "react";
import { Center, Stack, Title, Text, Group, Image } from "@mantine/core";
import { Card } from "../../../shared/ui/Card";

export interface AuthLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  logoSrc?: string;              
  headerExtra?: React.ReactNode; 
  footer?: React.ReactNode;      
  children?: React.ReactNode;    
}

export function AuthLayout({
  className,
  title = "Welcome",
  subtitle,
  logoSrc,
  headerExtra,
  footer,
  children,
  ...rest
}: AuthLayoutProps) {
  return (
    <Center mih="100vh" className={className} {...rest}>
      <Card className="w-full max-w-md" p="lg" radius="md" withBorder shadow="sm">
        <Stack gap="lg">
          <Stack gap={4} align="center">
            {headerExtra}
            {logoSrc ? (
              <Image src={logoSrc} alt="Logo" w={56} h={56} fit="contain" />
            ) : null}
            <Title order={3}>{title}</Title>
            {subtitle ? <Text c="dimmed" size="sm" ta="center">{subtitle}</Text> : null}
          </Stack>

          <div>{children}</div>

          {footer ? <Group justify="center">{footer}</Group> : null}
        </Stack>
      </Card>
    </Center>
  );
}
