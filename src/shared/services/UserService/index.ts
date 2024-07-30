import { makeAutoObservable } from "mobx";
import { userApi } from "shared/api/user";
import { IDay, IUser } from "shared/types";

class UserService {
  user: IUser | null = null;
  dayInfo: IDay | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getUser = async () => {
    const { data: user } = await userApi.getProfile();
    this.user = user;

    const { data } = await userApi.getDay();
    this.dayInfo = data;
  };
}

export const userService = new UserService();
