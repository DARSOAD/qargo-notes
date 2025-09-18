import React from "react";
import { AuthLayout } from "../../features/auth/components/AuthLayout";
import { LoginForm } from "../../features/auth/components/LoginForm";
import { AuthSwitcher } from "../../features/auth/components/AuthSwitcher";
import { useLogin } from "../../features/auth/hooks/useLogin";

const LOGO_SRC = "/src/shared/assets/logo.svg";

export type LoginPageProps = React.HTMLAttributes<HTMLDivElement>;

export function LoginPage({ className, ...rest }: LoginPageProps) {

  const { submit, loading, errorText } = useLogin();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = fd.get("email") as string;
    const password = fd.get("password") as string;

    await submit({ email, password });
  };


  return (
    <AuthLayout
      className={className}
      title="Sign in"
      subtitle="Access your Qargo Notes"
      logoSrc={LOGO_SRC}
      {...rest}
    >
      <LoginForm 
        onSubmit={handleSubmit} 
        isLoading={loading} 
        errorText={errorText ?? undefined}
      />
      <AuthSwitcher mode="login" />
    </AuthLayout>
  );
}
