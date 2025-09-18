import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  accessToken: string | null;
  userId: number | null;
  email: string | null;
  setAuth: (auth: { accessToken: string; userId: number; email: string }) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      userId: null,
      email: null,
      setAuth: ({ accessToken, userId, email }) =>
        set({ accessToken, userId, email }),
      clear: () => set({ accessToken: null, userId: null, email: null }),
    }),
    {
      name: "auth-storage", // LocalStorage key
    }
  )
);
