import { withInstall } from '@commonUI/utils/with-install';
import _TableColumn from './src/tableColumn.vue';


const TableColumn = withInstall(_TableColumn);

export default TableColumn;

export type { columnProps } from './src/tableColumn';

declare module 'vue' {
  export interface GlobalComponents {
    ZTableColumn: typeof TableColumn;

  }
}