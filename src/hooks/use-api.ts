"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import api from "@/lib/axios";
import type { AxiosRequestConfig } from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiEndpoint {
  url: string;
  method?: HttpMethod;
}

export interface ApiConfig {
  queryKey: string[];
  invalidateKeys?: string[][];
  get: string | ApiEndpoint;
  post?: string | ApiEndpoint;
  put?: string | ApiEndpoint;
  patch?: string | ApiEndpoint;
  delete?: string | ApiEndpoint;
}

interface RequestOptions {
  params?: Record<string, string>;
  body?: unknown;
  headers?: Record<string, string>;
}

function resolveEndpoint(endpoint: string | ApiEndpoint): {
  url: string;
  method: HttpMethod;
} {
  if (typeof endpoint === "string") {
    return { url: endpoint, method: "GET" };
  }
  return { url: endpoint.url, method: endpoint.method ?? "GET" };
}

async function request<T>(
  endpoint: string | ApiEndpoint,
  defaultMethod: HttpMethod,
  options?: RequestOptions,
): Promise<T> {
  const { url, method: endpointMethod } = resolveEndpoint(endpoint);
  const method = endpointMethod !== "GET" ? endpointMethod : defaultMethod;

  const config: AxiosRequestConfig = {
    url,
    method,
    params: options?.params,
    headers: options?.headers,
    ...(options?.body ? { data: options.body } : {}),
  };

  const res = await api.request<T>(config);
  return res.data;
}

export function useApi<TData = unknown>(
  config: ApiConfig,
  queryOptions?: Omit<UseQueryOptions<TData>, "queryKey" | "queryFn">,
) {
  const queryClient = useQueryClient();

  const query = useQuery<TData>({
    queryKey: config.queryKey,
    queryFn: () => request<TData>(config.get, "GET"),
    ...queryOptions,
  });

  const allKeys = [config.queryKey, ...(config.invalidateKeys ?? [])];
  const invalidate = () =>
    Promise.all(
      allKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })),
    );

  const useMutationFor = <TBody = unknown, TResponse = unknown>(
    endpoint: string | ApiEndpoint | undefined,
    defaultMethod: HttpMethod,
    options?: UseMutationOptions<TResponse, Error, TBody>,
  ) =>
    useMutation<TResponse, Error, TBody>({
      mutationFn: (body: TBody) =>
        request<TResponse>(endpoint!, defaultMethod, { body }),
      onSuccess: (...args) => {
        invalidate();
        options?.onSuccess?.(...args);
      },
      ...options,
    });

  /* eslint-disable react-hooks/rules-of-hooks */
  const post = config.post ? useMutationFor(config.post, "POST") : undefined;

  const put = config.put ? useMutationFor(config.put, "PUT") : undefined;

  const patch = config.patch
    ? useMutationFor(config.patch, "PATCH")
    : undefined;

  const remove = config.delete
    ? useMutationFor(config.delete, "DELETE")
    : undefined;
  /* eslint-enable react-hooks/rules-of-hooks */

  return {
    ...query,
    post,
    put,
    patch,
    remove,
    invalidate,
  };
}

// const api = useApi({
//   queryKey: ["posts"],
//   invalidateKeys: [["users"], ["comments"]],
//   get: "/api/posts",
//   post: { url: "/api/posts", method: "POST" },
// });

// وقتی post.mutate() صدا زده بشه و موفق بشه:
// 1. کوئری ["posts"] (queryKey خودش) invalidate میشه
// 2. کوئری ["users"] invalidate میشه
// 3. کوئری ["comments"] invalidate میشه

