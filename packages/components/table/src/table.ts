import { PropType } from 'vue'
export const tableProps = {
  data: {
    type: Array as PropType<Array<Table>>,
    default: () => []
  },
  border: {
    type: Boolean,
    default: false
  }
}

export interface TableProps {

}

export const tableHeaderProps = {
  columns: {
    type: Array as PropType<Array<Columns>>,
    default: () => [],
    required: true
  },

}

export const tableBodyProps = {
  data: {
    type: Array as PropType<Array<Table>>,
    default: () => [],
    required: true
  }
}


export interface Table{
  [key: string]: any
}



/* z-table-columns 属性 */
export interface Columns {
  prop:string,
  label:string,
  width?:string,
  sortable?:boolean,
  sortMethod?:Function,
  align?: Align,
}
const enum Align {
  Left = 'left',
  Center = 'center',
  Right = 'right'
}

