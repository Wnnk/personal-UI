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
  size: {
    type: String,
    values: ['small','default', 'large'],
  }

  
} as const

export const formEmits = {

}

