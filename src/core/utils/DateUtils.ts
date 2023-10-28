import { date } from 'quasar';

export function caculateBirthday(stringDate: string): number {
  if (!date.isValid(stringDate)) {
    throw 'Error .. fecha invalida';
  }

  const unit = 'days';
  const date1 = new Date();
  const date2 = date.extractDate('30/05/1998', 'DD/MM/YYYY');
  const diff = date.getDateDiff(date1, date2, unit);
  return Math.floor(diff / 365);
}
