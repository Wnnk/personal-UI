import { withInstall } from '@commonUI/utils/with-install';
import _Tree from './src/Tree.vue';

const Tree = withInstall(_Tree);

export  default Tree

declare module 'vue' {
  export interface GlobalComponents {
    ZTree: typeof Tree
  }
}