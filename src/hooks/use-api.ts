"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiEndpoint {
  url: string;
  method?: HttpMethod;
}

export interface ApiConfig {
  queryKey: string[];
  get: string | ApiEndpoint;
  post?: string | ApiEndpoint;
  put?: string | ApiEndpoint;
  patch?: string | ApiEndpoint;
  delete?: string | ApiEndpoint;
}

interface FetchOptions {
  params?: Record<string, string>;
  body?: unknown;
  headers?: Record<string, string>;
}

function resolveEndpoint(
  endpoint: string | ApiEndpoint
): { url: string; method: HttpMethod } {
  if (typeof endpoint === "string") {
    return { url: endpoint, method: "GET" };
  }
  return { url: endpoint.url, method: endpoint.method ?? "GET" };
}

function buildUrl(url: string, params?: Record<string, string>): string {
  if (!params) return url;
  const query = new URLSearchParams(params).toString();
  return query ? `${url}?${query}` : url;
}

async function request<T>(
  endpoint: string | ApiEndpoint,
  defaultMethod: HttpMethod,
  options?: FetchOptions
): Promise<T> {
  const { url, method: endpointMethod } = resolveEndpoint(endpoint);
  const method = endpointMethod !== "GET" ? endpointMethod : defaultMethod;

  const res = await fetch(buildUrl(url, options?.params), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...(options?.body ? { body: JSON.stringify(options.body) } : {}),
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export function useApi<TData = unknown>(
  config: ApiConfig,
  queryOptions?: Omit<UseQueryOptions<TData>, "queryKey" | "queryFn">
) {
  const queryClient = useQueryClient();

  const query = useQuery<TData>({
    queryKey: config.queryKey,
    queryFn: ({ signal }) =>
      request<TData>(config.get, "GET", {
        headers: signal ? {} : undefined,
      }),
    ...queryOptions,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: config.queryKey });

  const createMutationFor = <TBody = unknown, TResponse = unknown>(
    endpoint: string | ApiEndpoint | undefined,
    defaultMethod: HttpMethod,
    options?: UseMutationOptions<TResponse, Error, TBody>
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
  const post = config.post
    ? createMutationFor(config.post, "POST")
    : undefined;

  const put = config.put
    ? createMutationFor(config.put, "PUT")
    : undefined;

  const patch = config.patch
    ? createMutationFor(config.patch, "PATCH")
    : undefined;

  const remove = config.delete
    ? createMutationFor(config.delete, "DELETE")
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
