import React from "react";
import { AuthLayout } from "../../features/auth/components/AuthLayout";
import { AuthSwitcher } from "../../features/auth/components/AuthSwitcher";
import { SignupForm } from "../../features/auth/components/SignupForm";
import { useSignup } from "../../features/auth/hooks/useSignup";

const LOGO_SRC = "/src/shared/assets/logo.svg";

export type SignupPageProps = React.HTMLAttributes<HTMLDivElement>;

export function SignupPage({ className, ...rest }: SignupPageProps) {
  const { submit, loading, errorText } = useSignup();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await submit({ name, email, password });
  };
  return (
    <AuthLayout
      className={className}
      title="Create account"
      subtitle="Start capturing your ideas in seconds"
      logoSrc={LOGO_SRC}
      {...rest}
    >
      <SignupForm 
        onSubmit={handleSubmit}
        isLoading={loading}
        errorText={errorText ?? undefined}
      />
      <AuthSwitcher mode="signup" />
    </AuthLayout>
  );
}
