export const formProps = {
  labelPosition: {
    type: String,
    values:['left', 'right', 'top'],
    default: 'left'
  },
  inline: {
    type: Boolean,
    default: false
  },
  model: {
    type: Object,
    default: () => ({})
  },
  labelWidth: {
    type: String,
    default: ''
  },

  
} as const

export const formEmits = {

}

