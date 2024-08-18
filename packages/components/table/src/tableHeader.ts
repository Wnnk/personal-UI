import { PropType } from 'vue';

interface ColumnsType {
  label: string;
  prop: string;
  width: string;
  sort: boolean;
  type: string;
}


export const tableHeaderProps = {
  border: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Array as PropType<ColumnsType[]>,
    default: () => []
  },
}


export const tableHeaderEmits = {
  'toggleSort': (type: SortType, prop: string) => {
    return { type, prop }
  }
}
export type SortType = 'asc' | 'desc' | ''