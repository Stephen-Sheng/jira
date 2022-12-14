import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { useCallback } from "react";

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

const apiUrl = process.env.REACT_APP_API_URL;
export const http = async (
  endpoint: string,
  { data, token, headers, ...customconfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customconfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "Pls login again" });
    }
    const data = await res.json();
    if (res.ok) return data;
    else return Promise.reject(data);
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  // Utility Types
  // 这个typeof是静态的，与JS中不一样
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
