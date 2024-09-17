export const isNumber = (value: any) => typeof value === 'number';
export const isString = (value: any) => typeof value ==='string';
export const isStringNumber = (value: string):  boolean => {
  if (!isString(value)) {
    return false;
  }
  return !Number.isNaN(Number(value));
}

export const addUnit = (value?: string | number, defaultUnit = 'px') => {
  if (!value) return '';
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
  throw new Error('Invalid value');
}