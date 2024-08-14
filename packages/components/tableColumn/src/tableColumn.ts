

export const columnProps = {
  label: {
    type: String,
    default: ""
  },
}

export const columnEmits =  {
  "column-click":(column: any) => {
    return column;
  }
}