import { cookies } from "next/headers";

const TOKEN_KEY = "token";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function setToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_KEY)?.value;
}

export async function removeToken() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_KEY);
}
