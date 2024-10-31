import type { ExtractPropTypes } from 'vue'
export const formProps = {
  size: {
    type: String,
  },
  rules: {
    type: Array,
    default: () => []
  },
  labelWidth: {
    type: String,
    default: ''
  },
  labelSuffix: {
    type: String,
    default: ''
  },
  labelPosition: {
    type: String,
  },
  inline: {
    type: Boolean,
    default: false
  },
  model: {
    type: Object,
    default: () => {}
  },
  scrollToError: {
    type: Boolean,
  },
  scrollIntoViewOptions: {
    type: [Object, Boolean]
  }

  
} as const;

export const formEmits = {
  
}


export type FormProps = ExtractPropTypes<typeof formProps>