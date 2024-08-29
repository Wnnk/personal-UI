import { withInstall } from '@commonUI/utils/with-install';
import _Table from './src/table.vue';
import _TableColumn from './src/tableColumn/table-column.vue'
const Table = withInstall(_Table);
const TableColumn = withInstall(_TableColumn);


export  {  Table, TableColumn }


export type { tableProps } from './src/table';
export type { tableColumnProps } from './src/tableColumn/tableColumn';

declare module 'vue' {
  export interface GlobalComponents {
    ZTable: typeof Table;
    ZTableColumn: typeof TableColumn;
  }
}

