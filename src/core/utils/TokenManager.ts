import { LocalStorage } from 'quasar';

export class TokenManager {
  constructor() {
    LocalStorage.set(process.env.TOKEN_NAME, null);
  }

  static get token() {
    return LocalStorage.getItem<string>(process.env.TOKEN_NAME);
  }

  static hasToken(): boolean {
    return !!TokenManager.token;
  }

  static removeToken() {
    LocalStorage.remove(process.env.TOKEN_NAME);
  }

  static setToken(token: string) {
    LocalStorage.set(process.env.TOKEN_NAME, token);
  }
}
