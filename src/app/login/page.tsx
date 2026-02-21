"use client";

import { useActionState } from "react";
import { Button, Input, Card, Typography, Alert, Flex } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginAction, type LoginState } from "./actions";

const { Title, Text } = Typography;

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    loginAction,
    null
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <Card className="w-full max-w-sm shadow-lg">
        <Flex vertical align="center" gap={24}>
          <div className="text-center">
            <Title level={3} className="mb-1!">
              ورود به حساب کاربری
            </Title>
            <Text type="secondary">ایمیل و رمز عبور خود را وارد کنید</Text>
          </div>

          {state?.message && (
            <Alert
              message={state.message}
              type={state.success ? "success" : "error"}
              showIcon
              className="w-full"
            />
          )}

          <form action={formAction} className="flex w-full flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium"
              >
                ایمیل
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                size="large"
                placeholder="example@mail.com"
                prefix={<UserOutlined />}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium"
              >
                رمز عبور
              </label>
              <Input.Password
                id="password"
                name="password"
                size="large"
                placeholder="رمز عبور"
                prefix={<LockOutlined />}
                required
              />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isPending}
              block
            >
              ورود
            </Button>
          </form>
        </Flex>
      </Card>
    </div>
  );
}
