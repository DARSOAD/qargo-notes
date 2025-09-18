export type SignupPayload = { name: string; email: string; password: string };
export type LoginPayload = { email: string; password: string };
export type LoginResponse = { access_token: string; token_type: "bearer"; user_id: number; email:string }