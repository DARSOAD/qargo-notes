import React from "react";
import { Card as MantineCard, type CardProps as MantineCardProps, Stack, Divider } from "@mantine/core";

export interface CardProps extends Omit<MantineCardProps, "children"> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export function Card({ className, header, footer, children, ...props }: CardProps) {
  return (
    <MantineCard className={className} withBorder shadow="sm" radius="md" p="lg" {...props}>
      <Stack gap="md">
        {header ? (
          <>
            <div>{header}</div>
            <Divider />
          </>
        ) : null}

        <div>{children}</div>

        {footer ? (
          <>
            <Divider />
            <div>{footer}</div>
          </>
        ) : null}
      </Stack>
    </MantineCard>
  );
}
