import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Typography } from "antd";
import { UserList } from "./user-list";

export default async function SSRQueryPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
  });

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 16px" }}>
      <Typography.Title level={2} className="font-vazir">
        نمونه SSR با TanStack Query
      </Typography.Title>
      <Typography.Paragraph type="secondary" className="font-vazir">
        این دیتا سمت سرور فچ شده و توی Network tab مرورگر ریکوئستی نمیبینید.
      </Typography.Paragraph>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserList />
      </HydrationBoundary>
    </div>
  );
}
