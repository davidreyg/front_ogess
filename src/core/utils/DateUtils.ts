import moment from 'moment';

export function calculateBirthday(stringDate: string): number {
  const birthDate = moment(stringDate, 'YYYY-MM-DD', true);
  if (birthDate.isValid()) {
    const today = moment();
    // console.log(today.diff(birthDate, 'years'));
    return today.diff(birthDate, 'years');
  } else return 0;
}
