import { withInstall } from '@commonUI/utils/with-install';
import _Table from './src/table.vue';


const Table = withInstall(_Table);

export default Table;

export type { tableProps } from './src/table';

declare module 'vue' {
  export interface GlobalComponents {
    ZTable: typeof Table;

  }
}