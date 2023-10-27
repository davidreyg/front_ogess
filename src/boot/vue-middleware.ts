import { boot } from 'quasar/wrappers';
import middleware from '@grafikri/vue-middleware';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router }) => {
  router.beforeEach(middleware());
});
