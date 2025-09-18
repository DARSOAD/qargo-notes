import { http } from "../../../shared/api/http";
import type { SignupPayload, LoginPayload, LoginResponse } from "../types";

export const AuthRepository = {
  async signup(data: SignupPayload): Promise<LoginResponse> {
    return http("/users/signup", { method: "POST", body: data });
  },
  async login(data: LoginPayload): Promise<LoginResponse> {
    return http("/users/login", { method: "POST", body: data });
  },
};