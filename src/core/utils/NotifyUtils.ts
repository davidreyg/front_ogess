import { Notify, QNotifyCreateOptions } from 'quasar';

export class NotifyUtils {
  static success(options: QNotifyCreateOptions) {
    Notify.create({
      type: 'positive',
      timeout: 3500,
      ...options,
    });
  }

  static error(options: QNotifyCreateOptions) {
    Notify.create({
      type: 'negative',
      timeout: 3500,
      ...options,
    });
  }

  static info(options: QNotifyCreateOptions) {
    Notify.create({
      type: 'info',
      timeout: 3500,
      ...options,
    });
  }
  static warn(options: QNotifyCreateOptions) {
    Notify.create({
      type: 'warning',
      timeout: 3500,
      ...options,
    });
  }
}
