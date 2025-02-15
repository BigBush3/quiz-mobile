import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { DevSettings } from "react-native";
import { MMKV } from "react-native-mmkv";
import { authService } from "shared/services";
import { IRefreshResponse } from "shared/types";

const storage = new MMKV();

const getToken = () => {
  const tokenString = storage.getString("token");
  return tokenString ? tokenString : null;
};

const getRefreshToken = () => {
  const refreshTokenString = storage.getString("refreshToken");
  return refreshTokenString ? refreshTokenString : null;
};

let accessToken = getToken();
let refreshToken = getRefreshToken();

storage.addOnValueChangedListener((key) => {
  if (key === "token") {
    accessToken = storage.getString(key) ?? null;
  }
});

storage.addOnValueChangedListener((key) => {
  if (key === "refreshToken") {
    refreshToken = storage.getString(key) ?? null;
  }
});

const $api = axios.create({
  baseURL: "http://64.227.122.167:8080/api",
});

$api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _isRetry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post<IRefreshResponse>(
          "http://64.227.122.167:8080/api/auth/token/refresh",
          { refresh_token: refreshToken }
        );

        const newAccessToken = response.data.token;
        const newRefreshToken = response.data.refresh_token;

        storage.set("token", newAccessToken);
        storage.set("refreshToken", newRefreshToken);

        accessToken = newAccessToken;
        refreshToken = newRefreshToken;

        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return $api.request(originalRequest);
      } catch (refreshError) {
        storage.delete("token");
        storage.delete("refreshToken");
        storage.set("isAuth", false);
        authService.changeProperty("isAuth", false);
      }
    }
    return Promise.reject(error);
  }
);

export default $api;
