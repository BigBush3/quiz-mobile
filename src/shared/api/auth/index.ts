import { AxiosResponse } from "axios";
import { $api } from "shared/config";
import { ILoginResponse } from "shared/types";

class AuthApi {
  async requestPassword(email: string): Promise<AxiosResponse<[]>> {
    return $api.post(`/user/password_request`, { email });
  }
  async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<ILoginResponse>> {
    return $api.post(`/auth/login`, { email, password });
  }
}

export const authApi = new AuthApi();
