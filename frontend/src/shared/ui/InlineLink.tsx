import React from "react";
import { Anchor, type AnchorProps } from "@mantine/core";
import { Link } from "react-router-dom";

export interface InlineLinkProps extends AnchorProps {
  to?: string;                     // soporte para router en el futuro
  children?: React.ReactNode;      // <- añade children explícitamente
}

export function InlineLink({ className, to, children, ...props }: InlineLinkProps) {
  if (to) {
    return (
      <Anchor component={Link} to={to} className={className} {...props}>
        {children}
      </Anchor>
    );
  }
  
  const hrefProps = to ? { href: to } : {};
  return (
    <Anchor className={className} {...hrefProps} {...props}>
      {children}
    </Anchor>
  );
}
