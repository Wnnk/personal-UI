

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
  sort: {
    type: Boolean,
    default: false
  },
  prop: {
    type: String,
    required: true,
  }

}

export const columnEmits =  {
  "column-click":(column: any) => {
    return column;
  }
}