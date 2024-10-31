

import { isString } from '@vue/shared'

export const addUnit = (value?: string | number, defaultUnit = 'px') => {
  if(!value) return '';
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`
  } else if(isString(value)) {
    return value
  }
  throw new Error("value must be a string or a number");
  
}

export const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false
  }
  return !Number.isNaN(Number(val))
}

export const isUndefined = (val: any): val is undefined => val === undefined
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
export const isNumber = (val: any): val is number => typeof val === 'number'
export const isFunction = (val: any): val is Function => typeof val === 'function'