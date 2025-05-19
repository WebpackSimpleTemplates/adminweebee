
export const ageFormat = (age: number) => {
  if (age === 0) {
    return "лет";
  }

  if (age === 1) {
    return "год";
  }

  if (age < 5) {
    return 'года';
  }

  if (age < 20) {
    return "лет";
  }

  return ageFormat(age % 10);
}

export const age = (dateOfBirth: string) => {
  const [year, month, day] = dateOfBirth.split('-');

  const now = new Date();

  let age = now.getFullYear() - +year;

  if (+month > (now.getMonth() + 1)) {
    age -= 1;
  }

  if (+month === (now.getMonth() + 1) && +day > now.getDate()) {
    age -= 1;
  }

  return age + ' ' + ageFormat(age);
}
