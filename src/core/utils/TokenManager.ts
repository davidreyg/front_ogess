import { LocalStorage } from 'quasar';

export default class TokenManager {
  private static _token = LocalStorage.getItem<string>(process.env.TOKEN_NAME);

  static get token() {
    return TokenManager._token;
  }

  static hasToken(): boolean {
    return !!TokenManager._token;
  }

  removeToken() {
    TokenManager._token = null;
  }
}
