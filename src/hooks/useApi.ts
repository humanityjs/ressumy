/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from '@/hooks/useAuth';
import axiosInstance from '@/lib/axiosInstance';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useApiQuery<T>({
  key,
  url,
  options,
  params,
}: {
  key: string[];
  url: string;
  options?: Partial<UseQueryOptions<T, AxiosError>>;
  params?: Record<string, string | number>;
}) {
  const { session } = useAuth();

  return useQuery<T, AxiosError>({
    queryKey: key,
    queryFn: async () => {
      const response = await axiosInstance.get(url, {
        headers: session?.access_token
          ? {
              Authorization: `Bearer ${session?.access_token}`,
            }
          : undefined,
        params,
      });

      return response.data;
    },
    ...options,
  });
}

export function useApiMutation<T, S>({
  url,
  method = 'post',
  options,
  useParams = false,
}: {
  url: string | ((data: S) => string);
  method?: 'post' | 'put' | 'patch' | 'delete';
  options?: UseMutationOptions<T, AxiosError, S>;
  useParams?: boolean;
}) {
  const { session } = useAuth();

  return useMutation<T, AxiosError, S>({
    mutationFn: async (data: S) => {
      // useful for dynamic urls e.g. /users/:id
      const resolvedUrl = typeof url === 'function' ? url(data) : url;
      const requestUrl = useParams
        ? `${resolvedUrl}?${new URLSearchParams(data as any).toString()}`
        : resolvedUrl;

      const requestConfig = {
        headers: session?.access_token
          ? { Authorization: `Bearer ${session?.access_token}` }
          : undefined,
      };

      let response;
      if (useParams) {
        // If using query params, send a request without body
        response = await axiosInstance[method](requestUrl, requestConfig);
      } else {
        if (method === 'delete') {
          response = await axiosInstance[method](requestUrl, requestConfig);
        } else {
          response = await axiosInstance[method](
            resolvedUrl,
            data as any,
            requestConfig
          );
        }
      }
      return response.data;
    },
    ...options,
  });
}
