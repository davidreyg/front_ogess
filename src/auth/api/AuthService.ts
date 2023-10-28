import { sttp } from 'src/boot/sttp';
import { ILoginRequest, ILoginResponse } from '../models';
import { TokenManager } from 'src/core/utils';

export class AuthService {
  private static _api = sttp;

  static async login(data: ILoginRequest) {
    return await AuthService._api
      .post<ILoginResponse>('/login', data)
      .then((response) => {
        /** SETEAR EL TOKEN EN EL LOCAL STORAGE */
        response.isSuccess() &&
          TokenManager.setToken(response.data().access_token);

        return response;
      });
  }

  static async logout() {
    return await AuthService._api
      .post<ILoginResponse>('/auth/logout')
      .then((response) => {
        /** ELIMINAR EL TOKEN EN EL LOCAL STORAGE */
        response.isSuccess() && TokenManager.removeToken();

        return response;
      });
  }
}
