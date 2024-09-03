import { PropType } from 'vue'

export const tableColumnProps = {
  prop: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: 'auto',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default:'',
  },
  sortable :{
    type: Boolean,
    default: false,
  },
  sortMethod: {
    type: Function,
  }
}

