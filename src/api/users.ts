import type { ApiConfig } from "@/hooks/use-api";

export const usersApi: ApiConfig = {
  queryKey: ["users"],
  get: "/auth/users",
  post: "/auth/users",
  delete: "/auth/users",
};
