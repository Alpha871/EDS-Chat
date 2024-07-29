import { makeAutoObservable, runInAction } from "mobx";

import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Route";
import { User, UserFormValues } from "../models/user";

export default class UserStore {
  user: User | null = null;
  GLoading = false;
  refreshTokenTimeout?: number;
  emailRes: string = "";
  emailResError: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    const user = await agent.Account.login(creds);
    store.commonStore.setToken(user.token);
    this.startRefreshTokenTimer(user);
    runInAction(() => (this.user = user));

    // store.modalStore.closeModal();
  };

  logout = async () => {
    store.commonStore.setToken(null);
    this.user = null;
  };

  register = async (creds: UserFormValues) => {
    const user = await agent.Account.register(creds);
    console.log(user);
    // runInAction(() => (this.user = user));
  };

  emailVerification = async (email: string, code: string) => {
    try {
      const res = await agent.Account.emailVerification(email, code);
      runInAction(() => {
        this.emailRes = res!;
      });
    } catch (error: any) {
      console.log(error);
      runInAction(() => {
        if (error.length === 1) this.emailResError = error[0] + "";
        console.log(error);
      });
    }
  };

  getCurrentUser = async () => {
    try {
      const user = await agent.Account.current();
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  setImage = (image: string) => {
    if (this.user) this.user.image = image;
  };

  GoogleLogin = async (accessToken: string) => {
    try {
      this.GLoading = true;
      const user = await agent.Account.GLogin(accessToken);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => {
        this.user = user;
        this.GLoading = false;
      });
      router.navigate("/chat");
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.GLoading = false;
      });
    }
  };

  refreshToken = async () => {
    this.stopRefreshTokenTimer();
    try {
      const user = await agent.Account.refreshToken();
      runInAction(() => (this.user = user));
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error);
    }
  };

  private startRefreshTokenTimer(user: User) {
    const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
    const expires = new Date(jwtToken.exp * 1000); //to milliseconds
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      this.refreshToken,
      timeout
    ) as unknown as number;
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
