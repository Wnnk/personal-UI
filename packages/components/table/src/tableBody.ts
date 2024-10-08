import { PropType } from 'vue';

interface ColumnsType {
  label: string;
  prop: string;
  width: string;
  sort: boolean;
}

export const tableBodyProps = {
  data: {
    type: Array,
    default: () => []
  },
  border: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Array as PropType<ColumnsType[]>,
    default: () => []
  },
  selectionRows: {
    type: Array as PropType<number[]>,
    required: true,
  }

}


export const tableBodyEmits = {
  'toggleSelection':(index:number,row:any,) => {
    return {index,row}
  }
}