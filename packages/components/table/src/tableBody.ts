import { PropType } from 'vue';
export const tableBodyProps = {
  data: {
    type: Array,
    default: () => []
  },
  border: {
    type: Boolean,
    default: false
  },
  
}