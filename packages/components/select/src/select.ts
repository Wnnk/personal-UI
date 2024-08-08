import {  PropType,ExtractPropTypes } from "vue"; 

export type Size = "small" | "medium" | "large"
export const selectProps = {
  multiple: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [Boolean, String, Number],
    required: true
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
}

const selectEmits = {
  "update:modelValue": (value: any) => true,
}