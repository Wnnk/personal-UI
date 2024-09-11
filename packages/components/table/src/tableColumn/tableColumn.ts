import { PropType } from 'vue'
import { Filter } from '../table'
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
  },
  filters: {
    type: Array as PropType<Array<Filter>>,
    default: () => [],
  },

}

