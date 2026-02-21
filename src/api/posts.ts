import type { ApiConfig } from "@/hooks/use-api";

const BASE = "https://jsonplaceholder.typicode.com";

export const postsApi: ApiConfig = {
  queryKey: ["posts"],
  get: `${BASE}/posts`,
  post: `${BASE}/posts`,
  put: `${BASE}/posts`,
  delete: `${BASE}/posts`,
};
