/* eslint-disable @typescript-eslint/ban-types */
// typings.d.ts or router.ts
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    middleware?: Function[];
  }
}
