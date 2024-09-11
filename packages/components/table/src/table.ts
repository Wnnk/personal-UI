import { PropType } from 'vue'
export const tableProps = {
  data: {
    type: Array as PropType<Array<Table>>,
    default: () => []
  },
  border: {
    type: Boolean,
    default: false
  },
  height: {
    type: String,
  },
  summary: {
    type: Boolean,
    default: false,
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
  border: {
    type: Boolean,
    default: false
  },
  sort: {
    type: Array as PropType<Array<string>>,
    default: () => []
  }

}

export const tableBodyProps = {
  data: {
    type: Array as PropType<Array<Table>>,
    default: () => [],
    required: true
  },
  columns: {
    type: Array as PropType<Array<Columns>>,
    default: () => [],
    required: true
  },
  border: {
    type: Boolean,
    default: false
  },
}


export const tableFooterProps = {
  // store: {
  //   type: Object as PropType<any>,
  //   required: true,
  // },
  columns: {
    type: Array as PropType<Array<Columns>>,
    default: () => [],
  },
  data: {
    type: Array as PropType<Array<Table>>,
    default: () => [],
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
  type: string,
  filters: Array<Filter>,
}

export interface Filter {
  text: string,
  value: any,
}

const enum Align {
  Left = 'left',
  Center = 'center',
  Right = 'right'
}


