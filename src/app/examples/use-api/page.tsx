import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Typography } from "antd";
import { usersApi } from "@/api/users";
import { UsersDemo } from "./users-demo";

export default async function UseApiExamplePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: usersApi.queryKey,
    queryFn: () =>
      fetch(
        typeof usersApi.get === "string" ? usersApi.get : usersApi.get.url
      ).then((res) => res.json()),
  });

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 16px" }}>
      <Typography.Title level={2} className="font-vazir">
        نمونه useApi Hook
      </Typography.Title>
      <Typography.Paragraph type="secondary" className="font-vazir">
        دکمه‌ها رو بزن — بعد از هر POST یا DELETE، لیست خودکار رفرش میشه.
      </Typography.Paragraph>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsersDemo />
      </HydrationBoundary>
    </div>
  );
}
