import {  PropType,ExtractPropTypes } from "vue"; 

export type Size = "small" | "medium" | "large"
export type Option = {
  label: string,
  value: string | number,
  disabled?: boolean,
}
export const selectProps = {
  multiple: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<Size>,
    default: "medium"
  },
  multipleLimit: {
    type: Number,
    default: 0
  },
  placeholder: {
    type: String,
    default: "请选择"
  },
  url:{
    type: String,
  },
  autoLoad: {
    type: Boolean,
    default: false
  },
  api:{
    type: Function,
    default: null
  },
  options:{
    type: Array as PropType<Option[]>,
    required: true,
    default: () => []
  },
  lazy:{
    type: Boolean,
    default: false
  },
}

export const selectEmits = {
  "update:modelValue": (value: any) => value,
  "update:options": (options: Option[]) => options,
}