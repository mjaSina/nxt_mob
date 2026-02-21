"use server";

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

  // TODO: replace with real authentication logic
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (email === "admin@example.com" && password === "123456") {
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
