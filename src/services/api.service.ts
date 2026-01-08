import axios from "axios";
import { showToast } from "../utils/helper/env/toast";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

axios.defaults.withCredentials = true;

const ISvalidateToken = (exp: number): boolean => {
  try {
    if (exp == 0) {
      return true;
    }
    if (exp < Date.now() / 1000) {
      return false;
    } else {
      return true;
    }
  } catch (_error) {
    return false;
  }
};

const privateapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

interface FailedRequest {
  resolve: () => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, _token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

privateapi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const expInCookie = getCookie("expIn");
    const expIn = Number.parseInt(
      typeof expInCookie === "string" ? expInCookie : "0"
    );

    if (!ISvalidateToken(expIn)) {
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({
            resolve: () => {
              resolve();
            },
            reject,
          });
        })
          .then(() => {
            return config;
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        await publicapi.post("/auth/refresh-token");
        isRefreshing = false;
        processQueue(null);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);
        redirect("/auth/login");
        return Promise.reject(
          refreshError instanceof Error
            ? refreshError
            : new Error(String(refreshError))
        );
      }
    }


    console.log("[API REQUEST]", {
      method: config.method?.toUpperCase(),
      url: config.url,
      params: config.params,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error: AxiosError) => {
    console.error("[API REQUEST ERROR]", error);
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

privateapi.interceptors.response.use(
  (response) => {

    const data = response.data as { message?: string };
    showToast(data.message ?? "Success", response.status);
    console.log("[API RESPONSE]", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });

    return response;
  },
  (error: AxiosError) => {
    console.error("[API RESPONSE ERROR]", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

const publicapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

publicapi.interceptors.request.use(
  (config) => {
    console.log("[API REQUEST]", {
      method: config.method?.toUpperCase(),
      url: config.url,
      params: config.params,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error: AxiosError) => {
    console.error("[API REQUEST ERROR]", error);
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

publicapi.interceptors.response.use(
  (response) => {
    console.log("[API RESPONSE]", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error: AxiosError) => {
    console.error("[API RESPONSE ERROR]", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

export default privateapi;
export { publicapi };
