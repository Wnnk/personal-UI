

export const columnProps = {
  label: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default:'',
  },
  width: {
    type: String,
    default: ""
  },
}

export const columnEmits =  {
  "column-click":(column: any) => {
    return column;
  }
}