import type { ApiConfig } from "@/hooks/use-api";

const BASE = "https://jsonplaceholder.typicode.com";

export const usersApi: ApiConfig = {
  queryKey: ["users"],
  get: `${BASE}/users`,
  post: `${BASE}/users`,
  delete: `${BASE}/users`,
};
