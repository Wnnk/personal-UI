import { withInstall } from '@commonUI/utils/with-install';
import _LuckyGrid from './src/luckygrid.vue';

const LuckyGrid = withInstall(_LuckyGrid);

export default LuckyGrid;

export type { luckyGridProps } from './src/luckygrid';

declare module 'vue' {
  export interface GlobalComponents {
    ZLuckyGrid: typeof LuckyGrid;
  }
}