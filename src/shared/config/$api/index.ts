import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { DevSettings } from "react-native";
import { MMKV } from "react-native-mmkv";
import { IRefreshResponse } from "shared/types";
import RNRestart from "react-native-restart";

const storage = new MMKV();

const getToken = () => {
  const tokenString = storage.getString("token");
  return tokenString ? JSON.parse(tokenString) : null;
};

const getRefreshToken = () => {
  const refreshTokenString = storage.getString("refreshToken");
  return refreshTokenString ? JSON.parse(refreshTokenString) : null;
};

let accessToken = getToken();
let refreshToken = getRefreshToken();

const $api = axios.create({
  baseURL: "http://142.93.166.36:8080/api",
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
          "http://142.93.166.36:8080/api/auth/token/refresh",
          { refresh_token: refreshToken }
        );
        const newAccessToken = response.data.token;
        const newRefreshToken = response.data.refresh_token;

        storage.set("token", JSON.stringify(newAccessToken));
        storage.set("refreshToken", JSON.stringify(newRefreshToken));

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
        if (__DEV__) {
          DevSettings.reload();
        } else {
          RNRestart.Restart();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default $api;
