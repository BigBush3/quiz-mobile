import { makeAutoObservable } from "mobx";
import { authApi } from "shared/api";
import { storage } from "shared/utils/storage";

class AuthService {
  email: string = "";
  password: string = "";
  isAuth: boolean = false;

  constructor() {
    makeAutoObservable(this);

    this.isAuth = storage.getBoolean("isAuth") || false;
  }

  changeProperty = (
    property: "email" | "password" | "isAuth",
    value: string | boolean
  ) => {
    (this as any)[property] = value;
  };

  requestPassword = async () => {
    await authApi.requestPassword(this.email);
  };

  login = async () => {
    try {
      const { data } = await authApi.login(this.email, this.password);
      storage.set("token", data.token);
      storage.set("refreshToken", data.refresh_token);
      this.isAuth = true;
      storage.set("isAuth", true);
    } catch (e: any) {
      console.log(e, "auth");
      return e.response;
    }
  };

  logout = () => {
    try {
      storage.delete("token");
      storage.delete("refreshToken");
      this.isAuth = false;
      storage.set("isAuth", false);
    } catch (e: any) {
      console.log(e);
    }
  };
}

export const authService = new AuthService();
