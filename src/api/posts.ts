import type { ApiConfig } from "@/hooks/use-api";

export const postsApi: ApiConfig = {
  queryKey: ["posts"],
  get: "/posts",
  post: "/posts",
  put: "/posts",
  delete: "/posts",
};
