import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { AuthRepository } from "../repository/AuthRepository";
import type { SignupPayload, LoginResponse } from "../types";
import { HttpError } from "../../../shared/api/http";
import { useAuthStore } from "../store/authStore";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const submit = useCallback(
    async (form: SignupPayload): Promise<LoginResponse> => {
      setLoading(true);
      setErrorText(null);
      try {
        const res = await AuthRepository.signup(form);

        if ("access_token" in res) {
          setAuth({
            accessToken: res.access_token,
            userId: res.user_id,
            email: res.email,
          });
        }

        notifications.show({
          title: "Account created",
          message: "You can now log in with your credentials.",
        });

        navigate("/login");
        return res;
      } catch (err: unknown) {
        let msg = "Signup failed";
        if (err instanceof HttpError) {
          msg = err.message;
        } else if (err instanceof Error) {
          msg = err.message;
        }

        setErrorText(msg);
        notifications.show({ color: "red", title: "Error", message: msg });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [navigate, setAuth]
  );

  return { submit, loading, errorText };
}
