import { Notify, QNotifyCreateOptions } from 'quasar';

export class NotifyUtils {
  static success(options: QNotifyCreateOptions) {
    Notify.create({
      type: 'positive',
      ...options,
    });
  }

  static error(options: QNotifyCreateOptions) {
    Notify.create({
      type: 'negative',
      ...options,
    });
  }
}
