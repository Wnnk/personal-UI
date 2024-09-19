export const formItemProps = {
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  labelPosition: {
    type: String,
    values: ['left', 'right', 'top'],
    default: 'left',
  },
  label: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    values: ['small','default', 'large'],
    default:'default'
  }
}

export const formItemEmits = {
  
}