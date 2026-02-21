import type { ApiConfig } from "@/hooks/use-api";

export const postsApi: ApiConfig = {
  queryKey: ["posts"],
  get: "/main/posts",
  post: "/main/posts",
  put: "/main/posts",
  delete: "/main/posts",
};
