import Sttp from '@supercharge/sttp';
import { boot } from 'quasar/wrappers';
import { TokenManager } from 'src/core/utils';

export const sttp = Sttp.withOptions({
  baseURL: process.env.API_BASE_URL,
  withCredentials: true,
});

export default boot(({ router }) => {
  sttp.axios().interceptors.request.use(
    (config) => {
      try {
        if (TokenManager.hasToken()) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          config.headers!.Authorization = `Bearer ${TokenManager.token}`;
        }
        return config;
      } catch (error) {
        throw new Error(error as string);
      }
    },
    (error) => Promise.reject(error)
  );
});
