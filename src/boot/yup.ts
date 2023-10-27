import { boot } from 'quasar/wrappers';
import { es } from 'yup-locales';
import { setLocale } from 'yup';
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  setLocale(es);
});
