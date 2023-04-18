import { paramsToString } from "./index";
import * as auth from "../auth-provider";
import { Auth, useAuth } from "../context/auth-content";
import qs from "qs";
import { useCallback } from "react";
interface Config extends RequestInit {
  token?: string;
  data?: object;
}
const apiUrl = process.env.REACT_APP_API_URL;

export const http = (endpoint: string, { data, token, ...customConfig }: Config = {}) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") { 
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};


export const useHttp = () => {
    const {user} = useAuth() as Auth
    return useCallback((...[endpoint,config]:Parameters<typeof http>) => http(endpoint,{...config,token:user?.token}),[user?.token])
}