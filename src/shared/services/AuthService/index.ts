import { makeAutoObservable } from "mobx";
import { DevSettings } from "react-native";
import { MMKV } from "react-native-mmkv";
import { authApi } from "shared/api";
import RNRestart from "react-native-restart";

class AuthService {
  email: string = "";
  password: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  changeProperty = (property: "email" | "password", value: string) => {
    this[property] = value;
  };

  requestPassword = async () => {
    await authApi.requestPassword(this.email);
  };

  login = async () => {
    try {
      const storage = new MMKV();
      const { data } = await authApi.login(this.email, this.password);
      storage.set("token", JSON.stringify(data.token));
      storage.set("refreshToken", JSON.stringify(data.refresh_token));
      DevSettings.reload();
      RNRestart.Restart();
    } catch (e: any) {
      console.log(e, "auth");
      return e.response;
    }
  };
}

export const authService = new AuthService();
