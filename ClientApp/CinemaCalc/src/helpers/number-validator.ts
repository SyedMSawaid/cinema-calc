export function isValidNumber(input: string) {
  const regex = /^\d+(\.\d{1,2})?$/;
  return regex.test(input);
}
