/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    API_BASE_URL: 'https://ogess_backend.dev.com/v1/api';
    TOKEN_NAME: 'TOKEN_NAME';
  }
}
