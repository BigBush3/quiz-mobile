import { AxiosResponse } from "axios";
import { $api } from "shared/config";
import { IDay, IUser } from "shared/types";

class UserApi {
  async getProfile(): Promise<AxiosResponse<IUser>> {
    return $api.get("/user/profile");
  }
  async getDay(): Promise<AxiosResponse<IDay>> {
    return $api.get("/tex/day");
  }
}

export const userApi = new UserApi();
