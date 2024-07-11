import { withInstall } from '@commonUI/utils/with-install';
import _Virtual from './src/virtual';

const Tree = withInstall(_Virtual);

export  default Tree

declare module 'vue' {
  export interface GlobalComponents {
    ZVirtualList: typeof _Virtual
  }
}

