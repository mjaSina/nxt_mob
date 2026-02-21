import type { ApiConfig } from "@/hooks/use-api";

export const usersApi: ApiConfig = {
  queryKey: ["users"],
  get: "/users",
  post: "/users",
  delete: "/users",
};
