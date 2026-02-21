"use server";

import { setToken, removeToken } from "@/lib/auth";

export type LoginState = {
  success: boolean;
  message: string;
} | null;

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      success: false,
      message: "ایمیل و رمز عبور الزامی هستند",
    };
  }

  // TODO: replace with real backend API call
  // const res = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email, password }),
  // });
  // const data = await res.json();
  // if (!res.ok) return { success: false, message: data.message };
  // await setToken(data.token);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (email === "admin@example.com" && password === "123456") {
    await setToken("fake-jwt-token-replace-with-real-one");
    return {
      success: true,
      message: "ورود موفقیت‌آمیز بود",
    };
  }

  return {
    success: false,
    message: "ایمیل یا رمز عبور اشتباه است",
  };
}

export async function logoutAction() {
  await removeToken();
}
