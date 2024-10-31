import type { ExtractPropTypes } from 'vue'


export const componentSizes = ['', 'default', 'small', 'large'] as const;

export type ComponentSize = typeof componentSizes[number];

export type FormItemValidateState = typeof formItemValidateStates[number];
export type Arrayable<T> = T | T[];
export type FormItemProp = Arrayable<string>

export const formItemProps = {
  label: {
    type: String,
    default: ''
  },
  prop: {
    type: [String, Array]
    
  },
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  labelPosition: {
    type: String,
    values: ['left', 'right', 'top', ''],
    default: '',
  },
  required: {
    type: Boolean || undefined,
    default: undefined
  },
  rules: {
    type: Array,
    default: () => []
  },
  for: String,
  error: String,
  size: {
    type: String,
    values: componentSizes,
  },
  inline: {
    type: Boolean,
    default: false
  },


} 

export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export const formItemValidateStates = [
  '',
  'error',
  'validating',
  'success',
] as const;

export const componentSizeMap = {
  large: 40,
  default: 32,
  small: 24,
} as const


